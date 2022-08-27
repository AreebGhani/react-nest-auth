import { PipeTransform } from '@nestjs/common';
import { ObjectID } from 'typeorm';
export declare class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
    transform(value: any): ObjectID;
}
