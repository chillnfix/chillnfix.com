import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Method': 'GET,POST,OPTIONS'
  })
};



@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(name: string, uid: string) {
    return this.http.post('/createGroup', { name, uid }, httpOptions);
  }

  addUserByEmail(email: string, uid: string, groupId: string) {
    return this.http.post('/addUserToGroupByEmail', { email, uid, groupId }, httpOptions);
  }
}
