import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginResponse } from '../../../contracts/user/login_response';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | LoginResponse> = this.httpClientService.post<any | LoginResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })

    const loginResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;

    if (loginResponse) {
      localStorage.setItem("accessToken", loginResponse.token.accessToken);
      localStorage.setItem("refreshToken", loginResponse.token.refreshToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      })
    }

    callBackFunction();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | LoginResponse> = this.httpClientService.post<SocialUser | LoginResponse>({
      action: "GoogleLogin",
      controller: "auth"
    }, user);

    const loginResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;

    if (loginResponse) {
      localStorage.setItem("accessToken", loginResponse.token.accessToken);
      localStorage.setItem("refreshToken", loginResponse.token.refreshToken);

      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      });
    }

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | LoginResponse> = this.httpClientService.post<SocialUser | LoginResponse>({
      controller: "auth",
      action: "FacebookLogin"
    }, user);

    const loginResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;

    if (loginResponse) {
      localStorage.setItem("accessToken", loginResponse.token.accessToken);
      localStorage.setItem("refreshToken", loginResponse.token.refreshToken);

      this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      })
    }

    callBackFunction();
  }

  // async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<boolean> {
  //   const observable: Observable<any | LoginResponse> = this.httpClientService.post({
  //     action: "LoginWithRefreshToken",
  //     controller: "auth"
  //   }, { refreshToken: refreshToken });
  //
  //   const tokenResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;
  //
  //   if (tokenResponse) {
  //     localStorage.setItem("accessToken", tokenResponse.token.accessToken);
  //     localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
  //     return true;
  //   }
  //   callBackFunction();
  //   return false;
  // }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | LoginResponse> = this.httpClientService.post({
      action: "refreshtokenlogin",
      controller: "auth"
    }, { refreshToken: refreshToken });

    try {
      const tokenResponse: LoginResponse = await firstValueFrom(observable) as LoginResponse;

      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }

      callBackFunction(tokenResponse ? true : false);
    } catch {
      callBackFunction(false);
    }
  }
}
