import {Component, OnInit} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../services/common/auth.service";
import {UserAuthService} from "../../../services/common/models/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/common/models/user.service";
import {AlertifyMessagePosition, AlertifyMessageType, AlertifyService} from "../../../services/admin/alertify.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private router: Router
  ) {
    super(spinner);
  }

  state: any;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.hideSpinner(SpinnerType.BallAtom);
        })
      }
    });
  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerType.BallAtom);
    if (password != passwordConfirm) {
      this.alertifyService.message("Please confirm password!", {
        messageType: AlertifyMessageType.Error,
        position: AlertifyMessagePosition.TopRight
      });
      this.hideSpinner(SpinnerType.BallAtom)
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.alertifyService.message("Password was updated successfully.", {
              messageType: AlertifyMessageType.Success,
              position: AlertifyMessagePosition.TopRight
            })
            this.router.navigate(["/login"])
          },
          error => {
          });
        this.hideSpinner(SpinnerType.BallAtom)
      }
    })


  }
}
