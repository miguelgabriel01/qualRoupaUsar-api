// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(nickName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(nickName); // Deve retornar UserDocument
    if (user && await bcrypt.compare(pass, user.password)) { // Compara a senha com o hash
      const { password, ...result } = user.toObject(); // Converte o documento para objeto puro
      return result; // Retorna o usuário sem o password
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { nickName: user.nickName, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
      id: user._id,  // Pode usar diretamente o campo _id, sem erros de tipo.
      nickName: user.nickName
    };
  }

  async register(userData: { nickName: string; password: string }): Promise<UserDocument> {
    return this.usersService.create(userData); // Chama o método create no UsersService
  }
}
