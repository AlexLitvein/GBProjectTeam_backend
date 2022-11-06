import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditUserDto, UserDto } from './dto';
import { Model, ObjectId, Query, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.shema';
import { StorageService } from 'storage/storage.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'nest') private userModel: Model<UserDocument>,
  ) {}

  async findOne(id: ObjectId): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findAll() {
    return this.userModel.find({}) as unknown as Promise<UserDto>;
  }

  async editUser(userId: string, dto: EditUserDto) {
    /* INFO:
     * [options.new=false] «Boolean» По умолчанию findOneAndUpdate() возвращает документ
     * в том виде, в котором он был до применения обновления. Если вы установите
     * new: true, вместо этого findOneAndUpdate() предоставит вам объект после
     * применения обновления.
     */

    let user: UserDto = null;
    try {
      user = await this.userModel.findOneAndUpdate({ _id: userId }, dto, {
        new: true,
      });
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new ForbiddenException(
          'Пользователь с таким email уже существует',
        );
      }
      throw error;
    }
    return user;
  }

  async setUserAvatar(userId: string, fileId: string) {
    let user: UserDto = null;
    try {
      user = await this.userModel.findByIdAndUpdate(
        userId,
        { $set: { avatar: fileId } },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
    return user;
  }
}
