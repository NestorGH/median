import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// using the JwtStrategy implemented, which in this case i previously named "jwt"
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
