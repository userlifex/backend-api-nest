import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string) {
    return this.authenticationService.validateUser({ username, password });
  }
}
