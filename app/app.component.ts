import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbUserDetailsService } from './Services/db-user-details.service';
import { DbMedicineCartService } from './Services/db-medicine-cart.service';
import { MedicineCart } from './Classes/medicine-cart';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  medicineCart: Array<MedicineCart> = [];

  constructor(
    private ser: DbMedicineCartService,
    private userSer: DbUserDetailsService,
    private router: Router
  ) {
    this.ifConect();
  }
  connect: boolean = false;
  userName: string = "";

  ifConect() {
    if (this.userSer.getCurrentUser()) {
      this.userName = this.userSer.getCurrentUser().split("@")[0];
      //  debugger;
      this.connect = true;
      //    this.hoursToScheduler[i] = this.medicineToEdit.FrequencyOnDay.split("@")[i];
      //     this.userName=this.currentUser.split("@")[0];
    }
    else {
      this.connect = false;
    }
  }

  //עריכת פרטי לקוח
  EditUserDetails() {
    debugger;
    let edit = "edit";
    this.router.navigate(["/subscribe/", edit]);
  }

  //הסרת הלקוח מהאפליקציה
  RemoveUser() {
    debugger;
    // מחיקת הלקוח בעצמו
    this.ser.DeleteUserMedicineCart(this.userSer.getCurrentUser()).subscribe(
      data => {
        this.medicineCart = data;
      },
      err => { alert(err.message) }

    );
    //מחיקת הלקוח הנוכחי
    this.logOut();
    this.router.navigate(["/home"]);

  }
  //ריקון ה SESSION הלקוח לא קיים
  logOut() {
    this.userSer.removeCurrentUser();
    this.router.navigate(["/home"]);
  }

}
