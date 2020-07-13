import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicineCart } from 'src/app/Classes/medicine-cart';
import { DbUserDetailsService } from 'src/app/Services/db-user-details.service';
import { DbMedicineCartService } from 'src/app/Services/db-medicine-cart.service';
import { ActivatedRoute, Router } from '@angular/router';


// import moment from './../../../assets/script/moment';
import { forkJoin } from 'rxjs';
import { MedicineDetails } from 'src/app/Classes/medicine-details';
import { ExternalInterfacesService } from 'src/app/Services/external-interfaces.service';
// import { MedicineTable } from '../medicine-cart/medicine-cart.component';
@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.scss']
})
export class EditMedicineComponent implements OnInit {
  aa = true;
  //התרופה המיועדת כעת לעריכה
  medicineToEdit: MedicineCart;
  //משתנים פרטיים
  //מחרוזת שעות לתזכור
  hourArr: string = "";
  //שמירה של קוד התרופה הנוכחית
  idMedicine: number = 0;
  //משתנה המייצג שורה של תרופה לעריכה במקרה של 0 מסמל שזה תרופה חדשה-להוספה
  idToEdit: number = 0;
  //מיועד לדחיפת תרופה חדשה לסל התרופות
  arr: Array<MedicineCart> = [];
  //מחזיק את כל ערכי פקדי הטופס
  medicineDetailsForm: FormGroup;
  //קוד של תרופה בסל תרופות
  autoId: number = 1;
  //שם וסיסמה של הלקוח הנוכחי
  user: string = "";
  // מערך של סל תרופות ללקוח
  listMedicine: Array<MedicineCart> = [];
  //מערך של שעות לתזכור
  hoursToScheduler: Array<string> = [];
  //סימון אופן הנטילה ביחס לאוכל
  food: number = 0;
  //מחזיק את מס האיברים במערך של התזכורים
  index: number;
  //מסמל שאנו כעת במצב של עריכה-עבור שמירת הנתונים
  edit: boolean = false;
  //מערך של שם תרופה לפי החיפוש
  listNameOfMedicine: Array<string> = [];
  //דף מספר לחיפוש
  page: number = 1;
  //אובייקט שמחזיק בתוכו את כל הנתונים של התרופות שחוזר ממשרד הבריאות
  allMedicine: any[] = [];
  // dbאובייקט מסוג פרטי תרופה להצגה + לשמירה ב 
  medicineDetails: MedicineDetails;

  /////////////////////////
  moreDetailsOnMedcine: boolean = false;
  generic: boolean = false;

  p: string = "";
  //////////
  limitedTimeBoolian: boolean = false;
  update: boolean = false;
  show: boolean = false;
  //ניווט בסיסי לתמונה
  basePathImage = 'https://www.old.health.gov.il/units/pharmacy/Trufot/ShowAlon.asp?tmpPath=/units/pharmacy/trufot/arizot/';

  constructor(
    private ser: ExternalInterfacesService,
    //לקוח
    private userSer: DbUserDetailsService,
    //סל תרופות
    private medicineCartSer: DbMedicineCartService,
    //ניווט
    private activatedRouter: ActivatedRoute,
    private router: Router) {
    //this.user = userSer.currentUser;
    this.activatedRouter.params.subscribe(m => {
      this.idToEdit = m["edit"];
      if (this.idToEdit) {
        debugger;
        this.edit = true;
        //קבלת התרופה המיועדת לעריכה
        forkJoin([
          this.medicineCartSer.getMedicineByCartId(this.idToEdit),
          //קבלת סל תרופות של הלקוח
          this.medicineCartSer.getMedicineCartList(userSer.getCurrentUser()),
        ]).subscribe(([medicineCart, listMedicine
        ]) => {
          debugger;
          this.medicineToEdit = medicineCart;
          //   this.medicineToEdit.Medicine = JSON.parse(this.medicineToEdit.Medicine);
          this.listMedicine = listMedicine;
          debugger;
          this.medicineDetailsForm = this.editForm();

        });
      }
      else {
        alert("aaaa");
      }
    });
    debugger;
  }

  //#region  פו לחשיפת המשתנים בפורום
  // get MedicineName() {
  //   return this.medicineDetailsForm.get("MedicineName");
  // }
  get dateNumber() {
    return this.medicineDetailsForm.get("dateNumber");
  }
  get TillDate() {
    return this.medicineDetailsForm.get("TillDate");
  }
  get UntillDate() {
    return this.medicineDetailsForm.get("UntillDate");
  }
  get IfFood() {
    return this.medicineDetailsForm.get("IfFood");
  }
  get Amount() {
    return this.medicineDetailsForm.get("Amount");
  }
  get Frequency() {
    return this.medicineDetailsForm.get("Frequency");
  }
  get TotalQuantity() {
    return this.medicineDetailsForm.get("TotalQuantity");
  }

  //#endregion
  //#region function
  //מילוי מערך של אובייקטים-תרופה מאגר של משרד הבריאות
  ELEMENT_DATA: MedicineTable[] = [];
  //d: boolean = false;
  baseImagePath = "https://www.old.health.gov.il/units/pharmacy/trufot/arizot/";
  moreDetails() {
    debugger;

    this.ELEMENT_DATA = [];
    // let amount;
    let medicine = JSON.parse(this.medicineToEdit.Medicine);
    // for (let i = 0; i < medicine.activeComponents.length; i++)
    //   medicine.activeComponents[i].substring(" ", medicine.activeComponents[i].length);
    // s = s.substring(0, s.length - 4)
    this.header = medicine.dragHebName + "  " + medicine.dosageForm;

    //  this.d = true;
    let description = [
      ["התרופה", medicine.dragEnName],
      ["מרכיב", medicine.activeComponentsCompareName],
      ["אופן הנטילה", medicine.usageForm],
      ['סיפטום', medicine.secondarySymptom],
    ];

    this.ELEMENT_DATA.push({
      'MedicineName': medicine.dragHebName,
      //כמות מ"ל בחבילה
      'Amount': medicine.activeComponentsDisplayName,
      //סוג התרופה
      'DosageForm': medicine.dosageForm,
      'Description': description,
      'Active':medicine.activeComponentsCompareName,
      'Symptom':medicine.secondarySymptom
    });
  }

  JsonMedicine: any;
  detailsOfMedicine: string = "";
  pics: string = "";
  details: string = "";
  header: string = "";
  
  //פונקציה הבודקת את אופן הנטילה עם/בלי/אחרי אוכל 
  howToTake(id: number) {
    this.food = id;
  }
  //מייצר את המערך שלתוכו יכנס שעות לתזכור  
  frequencyonday(id: number) {
    debugger;
    if (this.hoursToScheduler.length != id) {
      debugger;
      for (var i = 0; i < id; i++) {
        //המערך הוגדל
        if (i >= this.hoursToScheduler.length) {
          this.hoursToScheduler[i] = "--:--";
        }
      }
      //המערך מוקטן
      if (id < this.hoursToScheduler.length) {
        debugger;
        let hour = this.hoursToScheduler;
        this.hoursToScheduler = [];
        for (var i = 0; i < id; i++) {
          this.hoursToScheduler[i] = hour[i];
        }
      }
      this.index = id;
    }
  }
  //פו להפיכת כל מערך שעות לתזכור למחרוזת
  convertToString() {
    for (var i = 0; i < this.hoursToScheduler.length; i++)
      this.hourArr += this.hoursToScheduler[i] + "@";
  }
  //פו המרה ממחרוזת למערך
  convertToArr() {
    for (var i = 0; i < parseInt(`${this.medicineToEdit.Frequency}`); i++) {
      this.hoursToScheduler[i] = this.medicineToEdit.FrequencyOnDay.split("@")[i];
    }
  }
  //#endregion


  checkStatus() {
    //ממתין לקניה
    if (this.TotalQuantity.value == 0) {
      return "Wait";
    }
    else
      //מלאי
      if (this.TotalQuantity.value > 0 && this.generic == true) {
        return "Stock";
      }
      else
        //פעיל- נוטל כרגע את התרופה
        if (this.TotalQuantity.value > 0) {
          return "Active";
        }
  }
  //שמירת הנתונים
  numDays: number = 0;
  save() {
    debugger;
    var status = this.checkStatus();
    if (this.numDays != 999)
      this.numDays = this.dateNumber.value;

    //שליחה לפו שתמיר את המערך למחרוזת
    this.convertToString();
    let MedicineDetails: MedicineCart = new MedicineCart(
      this.idToEdit,
      this.userSer.getCurrentUser(),
      this.medicineToEdit.Medicine,
      this.Amount.value,
      this.Frequency.value,
      this.hourArr,
      this.food,
      this.numDays,
      this.TotalQuantity.value,
      status);
    debugger;
    //עריכת תרופה בסל תרופות של הלקוח
    this.medicineCartSer.updateMedicineToCart(MedicineDetails).subscribe(
      data => { this.arr = data },
      err => { alert(err.message) });
    //ריקון הפקדים
    this.medicineDetailsForm.reset();
    this.router.navigateByUrl("medicineCart");
  }
  // medicine: any;
  //עריכת פורום  
  editForm() {
    debugger;
    this.moreDetails();
    //this.medicineToEdit.Medicine
    //  let medicine = JSON.parse(this.medicineToEdit.Medicine);
    let editedForm = new FormGroup({
      // MedicineName: new FormControl(medicine.dragHebName, [Validators.required]),
      Amount: new FormControl(this.medicineToEdit.Amount, [Validators.required, Validators.min(1), Validators.max(10)]),
      Frequency: new FormControl(this.medicineToEdit.Frequency, [Validators.required]),
      dateNumber: new FormControl(this.medicineToEdit.NumDateToTake, Validators.required),
      IfFood: new FormControl(this.medicineToEdit.Food, [Validators.required]),
      TotalQuantity: new FormControl(this.medicineToEdit.TotalQuantity, [Validators.required])
    });
    this.convertToArr();
    this.frequencyonday(parseInt(`${this.medicineToEdit.Frequency}`));
    return editedForm;
  }
  Till(status: number) {
    if (status == 1) {
      this.limitedTimeBoolian = true;
    }
    else {
      this.limitedTimeBoolian = false;
      this.numDays = 999;
    }
  }
  ngOnInit() {
    this.medicineDetailsForm = this.editForm();
  }

  timeToTake: boolean;
  frequency: number;
}
export interface MedicineTable {
  MedicineName: string,
  Amount: string,
  DosageForm: string,
  Active:string,
  Symptom:string,
  Description: string[][],
}


