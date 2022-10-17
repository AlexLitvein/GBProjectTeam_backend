import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.shema';
import { StorageService } from 'storage/storage.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async editUser(userId: string, dto: EditUserDto) {
    // INFO:
    /**
     * [options.new=false] «Boolean» По умолчанию findOneAndUpdate() возвращает документ
     * в том виде, в котором он был до применения обновления. Если вы установите
     * new: true, вместо этого findOneAndUpdate() предоставит вам объект после
     * применения обновления.
     */

    let user = null;
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
}
