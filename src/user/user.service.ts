import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.shema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async editUser(userId: string, dto: EditUserDto) {
    // console.log({
    //   userId: userId,
    //   dto: dto,
    // });

    const user = new this.userModel(dto);
    // return createdCat.save();

    const res = await this.userModel.updateOne({ id: userId }, user);

    console.log({
      matchedCount: res.matchedCount,
    });

    // const user = await this.prisma.user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     ...dto,
    //   },
    // });

    delete user.hash;
    return user;
  }
}
