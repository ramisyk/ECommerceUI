import {Component, ViewChild} from '@angular/core';
import {ListRoleComponent} from "./list-role/list-role.component";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  @ViewChild(ListRoleComponent) listComponents: ListRoleComponent;

  createdRole(createdRole: string) {
    this.listComponents.getRoles();
  }
}
