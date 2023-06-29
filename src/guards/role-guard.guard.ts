import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import {cookieParser} from 'src/hepls-services/cookieParser';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService:AuthService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers.cookie){
      return false;
    }
    const parsedCookies = cookieParser(request.headers.cookie);
    if(Object.prototype.hasOwnProperty.call(parsedCookies, 'AccsesToken')){
      const {role}= this.authService.decodeToken(parsedCookies.AccsesToken);
      return role !="Сотрудник";
    }
    else return false;
  }
}
