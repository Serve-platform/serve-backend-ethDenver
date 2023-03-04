import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { WalletAddress } from '../entities/wallet-address.entity';

@EntityRepository(WalletAddress)
export class WalletAddressRepository extends BaseRepository<WalletAddress> {}
