import { Injectable } from '@angular/core';
import { UserDetails } from '../Classes/user-details';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbUserDetailsService {
  currentUser: string;
  constructor(private ser: HttpClient) { }
  //כתובת שרת
  URL = "http://localhost:51335/api/UserDetails/";
  //כתובת שרת לשליחת אימיילים
  URLEMAIL = "http://localhost:51335/api/SendEmails/";
  //רשימת לקוחות
  GetUserDetailsList(): Observable<UserDetails[]> {
    return this.ser.get<UserDetails[]>(this.URL + "GetUserDetails");
  }
  AddUserDetails(user: UserDetails): Observable<UserDetails[]> {
    return this.ser.post<UserDetails[]>(this.URL + "AddUser/", user);
  }
  //הסרת לקוח מהאפליקציה
  DeleteUser(id: string): Observable<UserDetails[]> {
    return this.ser.delete<UserDetails[]>(this.URL + "DeleteUser/" + id)
  }
  //קבלת לקוח לפי הקוד שלו
  getUserById(id: string): Observable<UserDetails> {
    return this.ser.get<UserDetails>(this.URL + "getUserById/" + id)
  }
  //עדכון פרטי לקוח
  updateUserDetails(user: UserDetails): Observable<UserDetails[]> {
    return this.ser.put<UserDetails[]>(this.URL + "updateUserDetails/" + user.IdUser, user);
  }
  //שליחת מייל עם בקשה לסיסימא חדשה
  SendNewPassword(email: string, name: string): Observable<string> {
    return this.ser.post<string>(this.URLEMAIL + "changePassword/", { email, name });
  }
  //פו של החזרת משתמש הנוכחי באתר
  getCurrentUser() {
    //לאח"כמ ישמר ב SESSION
    //Load from local storage
    return this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  removeCurrentUser() {
    localStorage.removeItem("currentUser");
  }
}





