import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { Create_User } from '../../../contracts/user/create_user';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService) {
    super(spinner);
  }

  frm: UntypedFormGroup;


  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      confirmPassword: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let confirmPassword = group.get("confirmPassword").value;
        return password === confirmPassword ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }


  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid)
      return

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.toastrService.message(result.message, "Register is Succeeded", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      });
    }
    else {
      this.toastrService.message(result.message, "Register is Failed", {
        messageType: ToastrMessageType.Error,
        position: ToastrMessagePosition.TopRight
      });
    }
  }

}
