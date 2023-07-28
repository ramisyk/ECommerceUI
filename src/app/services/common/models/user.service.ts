import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from '../../../contracts/create_user';
import { LoginResponse } from '../../../contracts/login_response';
import { Token } from '../../../contracts/token';
import { User } from '../../../entities/user';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService,
  private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | LoginResponse> = this.httpClientService.post<any | LoginResponse>({
      controller: "users",
      action: "login"
    }, { userNameOrEmail, password })

    const loginResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;
    if (loginResponse) {
      localStorage.setItem("access-token", loginResponse.token.accessToken);
    }
    callBackFunction();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | LoginResponse> = this.httpClientService.post<SocialUser | LoginResponse>({
      action: "GoogleLogin",
      controller: "users"
    }, user);

    const tokenResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;
    debugger;
    if (tokenResponse) {
      localStorage.setItem("access-token", tokenResponse.token.accessToken);

      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      });
    }

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | LoginResponse> = this.httpClientService.post<SocialUser | LoginResponse>({
      controller: "users",
      action: "FacebookLogin"
    }, user);

    const tokenResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;

    if (tokenResponse) {
      localStorage.setItem("access-token", tokenResponse.token.accessToken);

      this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      })
    }

    callBackFunction();
  }
}
