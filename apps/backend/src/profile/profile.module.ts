import {Module} from '@nestjs/common';
import {ProfileService} from './profile.service';
import {ProfileController} from './profile.controller';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
/**
 * Represents the Profile module.
 */
export class ProfileModule {}
