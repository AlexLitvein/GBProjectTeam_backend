import { ForbiddenException, Injectable, UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto } from '@App/auth/dto';
import { TokenDto } from './dto/responses.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@App/user/schemas/user.shema';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(data: AuthDto): Promise<TokenDto> {
    const hash = await argon.hash(data.passcode);
    const user = new this.userModel({
      email: data.email,
      hash,
    });

    try {
      await user.save();
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new ForbiddenException('Такой пользователь уже существует');
      }
      throw error;
    }
  }

  async signin(data: AuthDto) {
    const user = await this.userModel
      .findOne({ email: data.email })
      // INFO: поле hash помечено как невыбираемое в схеме, но можно выбрать так) или так .select('+hash');
      .select({ hash: 1 });

    if (!user) {
      throw new ForbiddenException('Неверные входные данные');
    }
    const passMatch = await argon.verify(user.hash, data.passcode);
    if (!passMatch) {
      throw new ForbiddenException('Неверный пароль');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: string, email: string): Promise<TokenDto> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '9999m',
      secret: secret,
    });

    return { access_token: token };
  }
}
