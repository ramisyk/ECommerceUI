import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginResponse } from '../../../contracts/login_response';
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

      this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      })
    }

    callBackFunction();
  }
}
