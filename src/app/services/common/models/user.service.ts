import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from '../../../contracts/create_user';
import { LoginResponse } from '../../../contracts/login_response';
import { Token } from '../../../contracts/token';
import { User } from '../../../entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

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
}
