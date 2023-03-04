export class UserParams {
  uuid: string;
  id: string;
  password: string;
  nickName: string;
  switchLevel: string;
  image: string;
  authUuid: string;
  walletImg: string;
  concesHist: string;
  transAcc: string;
  loginType: LoginType;
}

export enum LoginType {
  KAKAO = 1,
  EMAIL = 2,
  WALLET = 3,
}
