import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsArray()
  @IsNotEmpty()
  project: string[];

  @IsString()
  @IsNotEmpty()
  activeYn: boolean;
}
