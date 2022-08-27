import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true, type: String })
  email: string;

  @Prop({ required: true, unique: true, type: String })
  password: string;

  @Prop({ type: Object, default: '' })
  img: object;
}

export const UserSchema = SchemaFactory.createForClass(User);
