import { ForbiddenException, Injectable, UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto, TokenDto } from 'auth/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'user/user.shema';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(data: AuthDto): Promise<TokenDto> {
    const hash = await argon.hash(data.password);
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

    /**
       INFO:
     * Глобальный фильтр исключений, обрабатывает исключения типа HttpException 
     * (и его подклассы). Если исключение нераспознано (не является ни HttpException, 
     * ни классом, наследующим от HttpException), встроенный фильтр исключений генерирует 
     * следующий ответ JSON по умолчанию:
     * {
     *  "statusCode": 500,
     *  "message": "Internal server error"
     * }
     * Глобальный фильтр исключений частично поддерживает библиотеку http-errors. 
     * В основном, любое брошенное исключение, содержащее свойства statusCode и message, 
     * будет правильно распознано и отправлено обратно в качестве ответа.
     * Фильтры исключений могут быть использованы по-разному: на методах, на контроллерах или глобально.
     */
    if (!user) {
      throw new ForbiddenException('Неверные входные данные');
    }
    const passMatch = await argon.verify(user.hash, data.password);
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

    return { token: token };
  }
}
