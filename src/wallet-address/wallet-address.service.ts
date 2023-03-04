import { Injectable } from '@nestjs/common';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';
import { WalletAddressRepository } from './repository/WalletAddressRepository';
import { WalletAddress } from './entities/wallet-address.entity';
import { AuthInfo } from '../auth/auth-info';
import { UserRepository } from '../components/user/repositories/user.repository';
import * as path from 'path';
import * as fs from 'fs';
import { ethers } from 'ethers';

@Injectable()
export class WalletAddressService {

  constructor (private readonly walletAddressRepository: WalletAddressRepository,
               private readonly userRepository: UserRepository,
               private readonly authInfo: AuthInfo){
  }

  async create({ msg, v, r, s }: CreateWalletAddressDto) {
    const mumbaiUrl = 'https://polygon-mumbai.g.alchemy.com/v2/W-XkZND8K-Mm3uW09In9Atd66Dj2j2X6';
    const provider = new ethers.providers.JsonRpcProvider(mumbaiUrl);

    const sigVerifierJsonPath = path.join('src/abis/sigVerifier.json');
    const { abi: sigVerifierAbi } = JSON.parse(fs.readFileSync(sigVerifierJsonPath).toString());
    const sigVerifierIface = new ethers.utils.Interface(sigVerifierAbi);
    const sigVerifierAddr = '0x563699d8798A654ec60A8F7720Fe8a0037ce69ae';
    const sigVerifierContract = new ethers.Contract(sigVerifierAddr, sigVerifierIface, provider);

    const recovered = await sigVerifierContract.verifyString(msg , v, r, s);

    //회원 정보 가지고와서 월렛 Update
    const walletAddress = new WalletAddress();
    // find userid UserRepository
    const user = await this.userRepository.findByIds([this.authInfo.userInfo.uuid]);
    console.log(user);
    walletAddress.userId = user[0];
    walletAddress.address = recovered ;
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
