import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      return ctx.switchToHttp().getRequest().user;
    }

    return null;
  },
);
