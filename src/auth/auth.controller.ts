import { Controller, All, Req, Res, Get } from '@nestjs/common';
import type { Request, Response } from 'express';
import { auth } from '../../lib/auth';
import { toNodeHandler } from "better-auth/node";

@Controller('api/auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(auth)(req, res);
  }
  // Email verification
  @Get('verify-email')
  async verifyEmail(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(auth)(req, res);
  }
}
