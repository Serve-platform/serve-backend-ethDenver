import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthInfo } from './auth-info';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor (private jwtService: JwtService, private authInfo: AuthInfo) {
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Request...');
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log(token);
    this.jwtService.verifyAsync(token).then(r => console.log(r));
    this.authInfo.userInfo = this.jwtService.decode(token);
    return next.handle();
  }
}
