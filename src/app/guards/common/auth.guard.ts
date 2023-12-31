import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastrService: CustomToastrService,
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallAtom);


    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrMessagePosition.TopRight
      })
    }

    this.spinner.hide(SpinnerType.BallAtom);

    return true;
  }
}
