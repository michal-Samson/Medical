import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbSceduleService {

  constructor(private ser: HttpClient) { }
  //כתובת שרת
  URL = "http://localhost:51335/api/Schedule/";
  //כתובת שרת לשליחת אימיילים
  URLEMAIL = "http://localhost:51335/api/SendEmails/";

  tookStatus(scheduleArr: Array<number>): Observable<number[]> {
    return this.ser.post<number[]>(this.URL + "tookStatus/", scheduleArr);
  }

}
