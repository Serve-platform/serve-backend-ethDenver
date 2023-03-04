import { Injectable } from '@nestjs/common';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';
import { WalletAddressRepository } from './repository/WalletAddressRepository';
import { WalletAddress } from './entities/wallet-address.entity';
import { AuthInfo } from '../auth/auth-info';
import { UserRepository } from '../components/user/repositories/user.repository';

@Injectable()
export class WalletAddressService {

  constructor (private readonly walletAddressRepository: WalletAddressRepository,
               private readonly userRepository: UserRepository,
               private readonly authInfo: AuthInfo){
  }

  async create(createWalletAddressDto: CreateWalletAddressDto) {
    //회원 정보 가지고와서 월렛 Update
    const walletAddress = new WalletAddress();
    // find userid UserRepository
    const user = await this.userRepository.findByIds([this.authInfo.userInfo.uuid]);
    console.log(user);
    walletAddress.userId = user[0];
    walletAddress.address = createWalletAddressDto.msghash + "," + createWalletAddressDto.r + "," + createWalletAddressDto.s + "," + createWalletAddressDto.v ;
    walletAddress.isActive = true;
    const result = await this.walletAddressRepository.save(walletAddress);
    return result;
  }

  findAll() {
    return `This action returns all walletAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walletAddress`;
  }

  update(id: number, updateWalletAddressDto: UpdateWalletAddressDto) {
    return `This action updates a #${id} walletAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} walletAddress`;
  }
}
