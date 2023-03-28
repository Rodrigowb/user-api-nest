// Nest imports
import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

// Files import

@Injectable()
export class AuthMiddleware implements NestMiddleware{
  public constructor(private readonly session: SessionService, private readonly jwtService: JwtService) { }
  
  public async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header['authorization'].replace('Bearer ', '');
      const payload: any = this.jwtService.decode(token);
      const user: User = await User.findByPk(payload.id);
      this.session.setUser(user);
    } catch (ex) {
      throw new BadRequestException('Token inválido');
    }
  }
}