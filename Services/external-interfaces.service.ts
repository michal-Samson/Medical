import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ExternalInterfacesService {

  constructor(private ser: HttpClient, private swPush: SwPush, private router: Router) {
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      this.router.navigateByUrl('/alerts')
    })
  }
  //כתובת שרת
  URL = "http://localhost:51335/api/Medicine/";
  //כתובת שרת לחיפוש  תרופה
  MEDICINE_URL = "http://localhost:3000/meds";
  searchMedicine(page: number, content: string): Observable<any> {
    return this.ser.post<any>(this.MEDICINE_URL, { page, content });
  }

  //אובייקט ששומר את נתוני המכשיר בתור מחרוזת
  subscriptionKey: string = "";
  //פו של החזרת נתוני המכשיר
  getSubscriptionKey(sub: any) {
    return this.subscriptionKey = JSON.parse(sub);
  }
  //שליחת נוטיפיקציות
  PUSH_NOTIFICATION_URL = "http://localhost:3000/api/newsletter";
  addPushSubscriber(sub: any): Observable<any> {
    this.subscriptionKey = JSON.stringify(sub);
    return this.ser.post<any>(this.PUSH_NOTIFICATION_URL, sub);
  }


}
