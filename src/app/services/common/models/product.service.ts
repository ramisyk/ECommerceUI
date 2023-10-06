import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from '../../../contracts/create_product';
import { List_Product } from '../../../contracts/list_product';
import { List_Product_Image } from '../../../contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: List_Product[] }>  {
    const promiseData: Promise<{ totalProductCount: number, products: List_Product[] }> = this.httpClientService.get < { totalProductCount: number, products: List_Product[] } >({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(data => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: 'products'
    }, id);

    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<List_Product_Image[]> {
    const getObsrevable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      controller: 'products',
      action: 'GetProductImages',
    }, id);

    const images: List_Product_Image[] = await firstValueFrom(getObsrevable);
    debugger;
    console.log(images);
    successCallBack();
    return images;
  }

  // id refer to product id
  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable: Observable<any> = this.httpClientService.delete({
      controller: 'products',
      action: 'DeleteProductImage',
      queryString: `imageId=${imageId}`
    }, id);

    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId:string, successCallBack?: () => void) {
    const changeShowcaseImageObservable = this.httpClientService.put({
      controller: 'products',
      action: 'ChangeShowcaseImage',
      queryString: `ImageId=${imageId}&ProductId=${productId}`
    }, {});
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
