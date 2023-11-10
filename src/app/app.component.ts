import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/common/auth.service';
import {CustomToastrService, ToastrMessagePosition, ToastrMessageType} from './services/ui/custom-toastr.service';
import {ComponentType, DynamicLoadComponentService} from "./services/common/dynamic-load-component.service";
import {DynamicLoadComponentDirective} from "./directives/common/dynamic-load-component.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerceUI';

  @ViewChild(DynamicLoadComponentDirective, {static: true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dynamicLoadComponentService: DynamicLoadComponentService
  ) {
    if (localStorage.getItem("accessToken"))
      authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrMessagePosition.TopRight
    });
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}

