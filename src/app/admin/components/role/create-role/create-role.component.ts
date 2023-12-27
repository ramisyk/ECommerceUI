import {Component, EventEmitter, Output} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService
} from "../../../../services/admin/alertify.service";
import {RoleService} from "../../../../services/common/models/role.service";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent extends BaseComponent{
  constructor(
              spiner: NgxSpinnerService,
              private roleService: RoleService,
              private alertify: AlertifyService) {
    super(spiner)
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);


    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Role başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyMessagePosition.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyMessagePosition.TopRight
        });
    });
  }
}
