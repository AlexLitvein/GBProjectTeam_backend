import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.shema';
import { StorageService } from 'storage/storage.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async editUser(userId: string, dto: EditUserDto) {
    // const res = await this.storage.list();
    // res.forEach((el) => {
    //   console.log(`Name: ${el.Key}, Size: ${el.Size}`);
    // });

    // INFO:
    /**
     * [options.new=false] «Boolean» По умолчанию findOneAndUpdate() возвращает документ
     * в том виде, в котором он был до применения обновления. Если вы установите
     * new: true, вместо этого findOneAndUpdate() предоставит вам объект после
     * применения обновления.
     */
    return this.userModel.findOneAndUpdate({ _id: userId }, dto, {
      new: true,
    });
  }
}
