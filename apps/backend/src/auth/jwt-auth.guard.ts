import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
/**
 * The JWTAuthGuard class represents a JWT authentication guard.
 */
export class JWTAuthGuard extends AuthGuard('jwt') {}
