import { Injectable } from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {firstValueFrom, Observable} from "rxjs";
import {BaseStorageUrl} from "../../contracts/base-storage-url";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) { }

  async getBaseStorageUrl() {
    const getObservable: Observable<BaseStorageUrl> = this.httpClientService.get<BaseStorageUrl>({
      controller: 'Files',
      action: 'GetBaseStorageUrl'
    })
    return  await firstValueFrom(getObservable);
  }
}
