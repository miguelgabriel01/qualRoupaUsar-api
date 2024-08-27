// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: { nickName: string; password: string }): Promise<UserDocument> {
    // Verifica se o nickName já existe
    const existingUser = await this.userModel.findOne({ nickName: userData.nickName }).exec();
    if (existingUser) {
      throw new ConflictException('Nome de usuário já existe');
    }

    // Criptografa a senha antes de salvar no banco de dados
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Cria um novo usuário com a senha criptografada
    const createdUser = new this.userModel({ ...userData, password: hashedPassword });
    return createdUser.save();
  }

  async findOne(nickName: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ nickName }).exec();
  }
}
