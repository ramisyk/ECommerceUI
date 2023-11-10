import {HttpEvent, HttpHandler, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {catchError, Observable, of} from 'rxjs';
import {SpinnerType} from '../../base/base.component';
import {CustomToastrService, ToastrMessagePosition, ToastrMessageType} from '../ui/custom-toastr.service';
import {UserAuthService} from './models/user-auth.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService {

  constructor(
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Oturum açınız!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrMessagePosition.TopRight
                });
              else
                this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrMessagePosition.BottomFullWidth
                });
            }
          }).then(data => {

          });

          // this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {
          //   if (!data) {
          //     this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
          //       messageType: ToastrMessageType.Warning,
          //       position: ToastrMessagePosition.BottomFullWidth
          //     });
          //   }
          // });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrMessagePosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı!", "Geçersiz istek!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrMessagePosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrMessagePosition.BottomFullWidth
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrMessagePosition.BottomFullWidth
          });
          break;
      }
      this.spinner.hide(SpinnerType.BallAtom)
      return of(error);
    }));
  }
}
