import { CallHandler, ExecutionContext, HttpStatus, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthInfo } from './auth-info';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor (private jwtService: JwtService, private authInfo: AuthInfo) {
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Request...');
    const request = context.switchToHttp().getRequest();
    //check request.headers.authorization
    if (!request.headers.authorization) {
      // Return an error response
      const errorResponse = {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        error: 'No authorization header',
      };
      return throwError(errorResponse);
    }
    const authHeader = request.headers.authorization;
    console.log(authHeader)
    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
      var result = this.jwtService.verify(token, {
        secret: `${process.env.JWT_SECRET}`,
      });
    }  catch (e) {
      console.error('에러');
      const errorResponse = {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        error: 'Invalid token',
      };
      return throwError(errorResponse);
    }
    console.log(result);
    this.authInfo.userInfo = this.jwtService.decode(token);
    return next.handle();
  }
}
