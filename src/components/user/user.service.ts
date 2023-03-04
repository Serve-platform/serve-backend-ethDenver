import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const firebaseConfig = {
  apiKey: `asdgadsg`,
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUsers() {
    const users = await this.userRepo.createQueryBuilder().getMany();
    return users;
  }

  async postUserByFirebase(response, user) {
    const post = user.body;
    const email = post['new_email'];
    const password1 = post['new_pw_1'];
    const password2 = post['new_pw_2'];

    if (password1 != password2) {
      response.send('확인 비밀번호 다름');
    } else {
      createUserWithEmailAndPassword(auth, email, password1)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          response.send('로그인 완료');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          response.send(error.code);
        });
    }
    return Promise.resolve(undefined);
  }

  async postLoginByFirebase(response: Response, user) {
    const post = user.body;
    const email = post['new_email'];
    const password = post['new_pw_1'];
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return Promise.resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return Promise.resolve(errorCode);
      });
  }
}
