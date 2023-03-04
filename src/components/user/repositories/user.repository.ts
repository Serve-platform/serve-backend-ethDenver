import { EntityRepository } from 'typeorm';
import { SetMetadata } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

// export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';
//
// export function CustomRepository(entity: Function): ClassDecorator {
//   return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
// }

// @CustomRepository(User)
@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
