import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Destination } from './destination';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(@Query() query: { page: number; limit: number }) {
    return this.userService.findUsers(query);
  }

  @Get('/find/:_id')
  findUser(@Param('_id') _id: any) {
    return this.userService.findOneUser(_id);
  }

  @Get('/img/:_id')
  async findImg(
    @Param('_id') _id: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const user = await this.userService.findOneUser(_id);
    const stream = createReadStream(join(process.cwd(), user.img.path));
    response.set({
      'Content-Disposition': `inline; filename="${user.img.filename}"`,
      'Content-Type': user.img.mimetype,
    });
    return new StreamableFile(stream);
  }

  @Post('/add')
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/update/:_id')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: Destination.destinationPath,
        filename: Destination.customFileName,
      }),
    }),
  )
  async updateUser(
    @Param() _id: any,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    updateUserDto.img = img;
    this.userService.updateUserData(_id, updateUserDto);
    const user = await this.userService.findOneUser(_id);
    return user;
  }

  @Delete('/delete/:_id')
  deleteUser(@Param() _id: any) {
    return this.userService.deleteUserData(_id);
  }
}
