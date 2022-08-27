import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUsers(query: { page: number; limit: number }): Promise<any> {
    const page = query.page || 0;
    const itemsPerPage = query.limit || 10;
    const totalPosts = await this.userModel.find().count();
    let pageCount = totalPosts / itemsPerPage;
    let NumberBeforeDecimalPoint = Math.floor(pageCount);
    const NumberAfterDecimalPoint = (pageCount - NumberBeforeDecimalPoint) * 10;
    if (NumberAfterDecimalPoint > 0) {
      NumberBeforeDecimalPoint += 1;
    }
    pageCount = NumberBeforeDecimalPoint;
    let skip = (page - 1) * itemsPerPage;
    skip = skip > -1 ? skip : 0;

    const users = await this.userModel
      .find()
      .sort({ _id: -1 })
      .limit(itemsPerPage)
      .skip(skip)
      .exec();
    return {
      users: users,
      total: totalPosts,
      pages: pageCount,
    };
  }

  async findOneUser(_id: any): Promise<any> {
    return await this.userModel.findById(_id).exec();
  }

  async findByEmail(email: any): Promise<any> {
    return await this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const createdUser = await new this.userModel(createUserDto).save();
      return createdUser;
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async updateUserData(_id: any, updateUserDtos: UpdateUserDto): Promise<any> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(_id, updateUserDtos)
        .exec();
      if (updatedUser) {
        return updatedUser;
      }
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async deleteUserData(_id: any): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(_id).exec();
    return deletedUser;
  }
}
