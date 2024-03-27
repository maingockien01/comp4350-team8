import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
/**
 * The JWTStrategy class represents a JWT authentication strategy.
 */
export class JWTStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of the JWTStrategy class.
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'supersecret',
    });
  }

  /**
   * Validates the JWT payload.
   * @param {any} payload - The JWT payload.
   * @return {Promise<any>}
   */
  async validate(payload: any) {
    return {
      username: payload.username,
      uid: payload.sub,
    };
  }
}
