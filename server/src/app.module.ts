import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://AreebGhani:areebghani22112003@cluster0.bessokw.mongodb.net/?retryWrites=true&w=majoritycluster0.bessokw.mongodb.net/?retryWrites=true&w=majority',
    ),
    ProfileModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
