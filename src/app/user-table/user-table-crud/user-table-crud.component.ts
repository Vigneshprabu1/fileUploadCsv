import { UserTableService } from './../../service/user-table.service';
import { Component, OnInit, Inject } from '@angular/core';
import { UserTable } from 'src/app/model/user-table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-table-crud',
  templateUrl: './user-table-crud.component.html',
  styleUrls: ['./user-table-crud.component.scss']
})
export class UserTableCRUDComponent implements OnInit {

  public user: UserTable;
  userFormGroup: FormGroup;
  private notifier: NotifierService;
  constructor(private dialogRef: MatDialogRef<UserTableCRUDComponent>,
              private userTableService: UserTableService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              notifier: NotifierService) {
                this.notifier = notifier;
                this.userFormGroup = new FormGroup({
                  userName: new FormControl('', [Validators.required]),
                  email: new FormControl('', [Validators.required]),
                  address: new FormControl('', [Validators.required]),
                  city: new FormControl('', [Validators.required]),
                  state: new FormControl('', [Validators.required]),
                  country: new FormControl('', [Validators.required]),
                  yearOfExp: new FormControl('', [Validators.required]),
                  salary: new FormControl('', [Validators.required]),
                });
               }

  ngOnInit(): void {
    if (this.data.value === 1) {
    this.user = new UserTable();
    } else {
      this.user = this.data.data;
    }
  }

  onNoClick() {
    this.dialogRef.close(1);
  }
  saveUserTable() {
    if (this.user._id === undefined) {
      this.user.createdBy = 'admin';
      this.userTableService.saveUser(this.user).subscribe((data) => {
        this.notifier.notify('success', 'Saved Successfully');
        this.dialogRef.close();
      }, (err) => {
        // const newmsg = err.error.error.message.substring(29);
        this.notifier.notify('error', 'Not save');
      });
    } else {
      this.user.createdBy = 'admin';
      this.userTableService.updateUser(this.user).subscribe((data) => {
        this.notifier.notify('success', 'Update Successfully');
        this.dialogRef.close();
      }, (err) => {
        console.log(err);
      });
    }
  }
}
