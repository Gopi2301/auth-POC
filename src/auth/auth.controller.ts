import { Controller, All, Req, Res, Get } from '@nestjs/common';
import type { Request, Response } from 'express';
import { auth } from '../../lib/auth';
import { toNodeHandler } from "better-auth/node";

@Controller('api/auth')
export class AuthController {
  /**
   * Catch-all handler for Better Auth routes.
   * Handles sign-in, sign-up, session, etc.
   */
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(auth)(req, res);
  }

  /**
   * Email verification endpoint.
   * Handles GET requests for email verification links.
   */
  @Get('verify-email')
  async verifyEmail(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(auth)(req, res);
  }
}
