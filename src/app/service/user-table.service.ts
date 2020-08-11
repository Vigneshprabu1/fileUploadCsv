import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class UserTableService {

  public baseUrl = environment.apiBaseUrl + '/users';
  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get(`${this.baseUrl}`);
  }
  saveUser(user) {
    return this.http.post(`${this.baseUrl}`, user);
  }
  updateUser(user){
    return this.http.patch(`${this.baseUrl}`, user);
  }
  deleteUser(user){
    return this.http.post(`${this.baseUrl}/deleteUser`, user);
  }
  getUserTableExportExcel() {
    const title = 'UserInfo';
    // const date = this.datePipe.transform(new Date(), 'dd/MM/yyyy  h:mm:ss');
    return this.http
      .get(`${this.baseUrl}/export`, {
        params: new HttpParams().append('token', localStorage.getItem('token')),
        observe: 'response',
        responseType: 'text',
      })
      .subscribe((r) => {
        saveAs(new Blob([r.body], { type: 'text/csv' }), title + '.csv');
      });
  }

  FileUpload(files) {
    return this.http.post(`${this.baseUrl}/fileUpload`, files);
  }
}
