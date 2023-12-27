import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {RoleService} from "../../../../services/common/models/role.service";
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService
} from "../../../../services/admin/alertify.service";
import {DialogService} from "../../../../services/common/dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {List_Role} from "../../../../contracts/role/List_Role";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent extends BaseComponent implements OnInit{

  constructor(
              spinner: NgxSpinnerService,
              private roleService: RoleService,
              private alertifyService: AlertifyService,
              private dialogService: DialogService) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Role> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getRoles() {
    this.showSpinner(SpinnerType.BallAtom);
    const allRoles: { datas: List_Role[], totalCount: number } = await this.roleService.getAllRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: AlertifyMessageType.Error,
      position: AlertifyMessagePosition.TopRight
    }))

    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.totalCount;
  }

  async pageChanged() {
    await this.getRoles();
  }

  async ngOnInit() {
    await this.getRoles();
  }
}
