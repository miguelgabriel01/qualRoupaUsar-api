// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'nickName' }); // Usa 'nickName' como o campo de usuário
  }

  async validate(nickName: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(nickName, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }
}
