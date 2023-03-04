import { PartialType } from '@nestjs/swagger';
import { CreateWalletAddressDto } from './create-wallet-address.dto';

export class UpdateWalletAddressDto extends PartialType(CreateWalletAddressDto) {}
