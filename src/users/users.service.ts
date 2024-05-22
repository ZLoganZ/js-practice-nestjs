import { readFileSync, writeFileSync } from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly listUsers = JSON.parse(
    readFileSync('users.json', 'utf8') || '[]',
  ) as User[];

  create(createUserDto: CreateUserDto) {
    const isExist = this.listUsers.some(
      (user) => user.username === createUserDto.username,
    );
    if (isExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    } else {
      this.listUsers.push(createUserDto);
      writeFileSync('users.json', JSON.stringify(this.listUsers));
      return createUserDto;
    }
  }

  findAll(query: UpdateUserDto) {
    const users = this.listUsers.filter((user: User) => {
      for (const key in query) {
        if (user[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
    return users;
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    const user = this.listUsers.find((user) => user.username === username);
    const index = this.listUsers.indexOf(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      for (const key in updateUserDto) {
        user[key] = updateUserDto[key];
      }
      this.listUsers.splice(index, 1, user);
      writeFileSync('users.json', JSON.stringify(this.listUsers));
      return user;
    }
  }

  remove(username: string) {
    const user = this.listUsers.find((user) => user.username === username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      const index = this.listUsers.indexOf(user);
      this.listUsers.splice(index, 1);
      writeFileSync('users.json', JSON.stringify(this.listUsers));
      return user;
    }
  }
}
