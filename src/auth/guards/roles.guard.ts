import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from '../guards/jwt.guard';

export const RoleGuard = (role: RoleEnum): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return user.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};
