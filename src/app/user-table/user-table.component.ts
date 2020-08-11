import { UserTableService } from './../service/user-table.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTable } from '../model/user-table';
import { NotifierService } from 'angular-notifier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserTableCRUDComponent } from './user-table-crud/user-table-crud.component';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  public user: UserTable;
  public userList: UserTable[];
  public rowView;
  fileData: File = null;
  dataSource;
  dataSourceRowTable;
  displayedColumns: string[] = ['index', 'userName', 'email', 'address', 'experience', 'salary', 'edit', 'delete'];
  displayedColumnsRowTable: string[] = ['row', 'errorDesp'];
  private notifier: NotifierService;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator1: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort1: MatSort;
  constructor(public dialog: MatDialog,  private notifierService: NotifierService, private userTableService: UserTableService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.user = new UserTable();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userTableService.getAllUser().subscribe((data: UserTable[]) => {
      this.userList = data;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error) => {
      console.log(error);
    });
  }

  addUser() {
    const dialogRef =  this.dialog.open(UserTableCRUDComponent, {
      data: {value: 1}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 1) {

      }
      this.getAllUsers();
    });
  }
  editUser(user) {
    const dialogRef = this.dialog.open(UserTableCRUDComponent, {
      data: { data: user, value: 2 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }
  deleteUser(user) {
    console.log('user', user);
    this.userTableService.deleteUser(user).subscribe((data: any) => {
      this.getAllUsers();
      this.notifier.notify('success', 'Delete Successfully');
    }, err => {
      this.notifier.notify('success', 'Not Delete User');
    });

  }

onFilesAdded(fileInput: any) {
    this.fileData = fileInput.target.files as File;
    const length = fileInput.target.files.length;
    const file = new FormData();
    for (let i = 0; i < length; i++) {
      file.append('file', this.fileData[0], this.fileData[0].name);
    }
    this.userTableService.FileUpload(file).subscribe((data: any) => {
      if (data.type === 'error') {
        this.rowView = data.type;
        this.dataSourceRowTable = new MatTableDataSource(data.rowValue);
        // this.dataSourceRowTable.paginator = this.paginator1;
        // this.dataSourceRowTable.sort = this.sort1;
      } else {
        this.getAllUsers();
        this.notifier.notify('success', 'FileUpload Successfully');
      }

    }, err => {
      if (err.error.message) {
        this.notifier.notify('error', err.error.message);
      } else {
        this.notifier.notify('error', 'Can\'t Update it');
      }
    });

  }
exportUser() {
    this.userTableService.getUserTableExportExcel();
  }

}
