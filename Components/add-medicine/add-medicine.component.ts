import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicineCart } from 'src/app/Classes/medicine-cart';
import { DbUserDetailsService } from 'src/app/Services/db-user-details.service';
import { DbMedicineCartService } from 'src/app/Services/db-medicine-cart.service';
import { Router } from '@angular/router';
//יבוא של ספריה המיועדת לסריקת ברקוד
import Quagga from 'quagga';

import { tap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { MedicineDetails } from 'src/app/Classes/medicine-details';
import { ExternalInterfacesService } from 'src/app/Services/external-interfaces.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {
  @ViewChild('med', { static: true }) _auto: ElementRef;
  //יש להמשיך ולסיים את התיעוד לקומפוננטה זו
  //מחרוזת שעות לתזכור
  hourArr: string = "";
  //שמירה של קוד התרופה הנוכחית
  idMedicine: number = 0;
  //מיועד לדחיפת תרופה חדשה לסל התרופות
  arr: Array<MedicineCart> = [];
  //מחזיק את כל ערכי פקדי הטופס
  medicineDetailsForm: FormGroup;
  //קוד של תרופה בסל תרופות
  //לאתחל אותו נכון
  autoId: number = 1;
  // מערך של סל תרופות ללקוח
  listMedicine: Array<MedicineCart> = [];
  //מערך של שעות לתזכור
  // hoursToScheduler: Array<any> = [];
  hoursToScheduler;
  //סימון אופן הנטילה ביחס לאוכל
  food: number = 0;
  //מחזיק את מס האיברים במערך של התזכורים
  index: number;
  //מערך של שם תרופה לפי החיפוש
  listNameOfMedicine: Array<string> = [];
  //דף מספר לחיפוש
  page: number = 1;
  //אובייקט שמחזיק בתוכו את כל הנתונים של התרופות שחוזר ממשרד הבריאות
  allMedicine: any[] = [];
  // dbאובייקט מסוג פרטי תרופה להצגה + לשמירה ב 
  medicineDetails: MedicineDetails;
  edit: number = 0;
  numDays: number = 0;
  /////////////////////////

  moreDetailsOnMedcine: boolean = false;
  limitedTimeBoolian: boolean = false;
  add: boolean = false;
  generic: boolean = false;
  MedicineDetails: MedicineCart;
  //ניווט בסיסי לתמונה
  basePathImage = 'https://www.old.health.gov.il/units/pharmacy/trufot/arizot/';

  constructor(
    private ser: ExternalInterfacesService,
    //לקוח
    private userSer: DbUserDetailsService,
    //סל תרופות
    private medicineCartSer: DbMedicineCartService,
    //יאפשר ניתוב
    private router: Router) {
    //קבלת סל תרופות לפי הלקוח הנוכחי
    this.medicineCartSer.getMedicineCartList(userSer.getCurrentUser()).subscribe(
      data => { this.listMedicine = data },
      err => { alert(err.message) });

  }

  //#region  פו לחשיפת המשתנים בפורום
  get MedicineName() {
    return this.medicineDetailsForm.get("MedicineName");
  }
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
  validPage: boolean = false;
  indexPage() {
    debugger;
    this.page++;
    debugger;
    this.fillArr(this.MedicineName.value);
  }
  prevPage() {
    debugger;
    if (this.page > 1) {
      this.page--;
      this.fillArr(this.MedicineName.value);
    }
    else {
      this.validPage = true;
      this.fillArr(this.MedicineName.value);
    }
  }
  x: boolean = false;
  fillArr(medicfromdoc: string) {
    debugger;
    this.allMedicine = [];
    this.x = true
    //  this.MedicineName.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(medicfromdoc=>{console.log(medicfromdoc)})
    debugger;
    //לשים לב לשלוח לסרביס המעודכן שלנו מצריך שינוי
    this.ser.searchMedicine(this.page, medicfromdoc).subscribe(

      ({ results }) => {
        this.x = true;
        debugger;
        console.dir(results)
        this.allMedicine = results;
        this.x = false;
        for (let i = 0; i < this.allMedicine.length; i++) {
          debugger;

          //  this.allMedicine[i].medicine.images[0] ? this.basePathImage + this.allMedicine[i].medicine.images[0].url : "./assets/icons/deafultImage.png";

          this.listNameOfMedicine[i] = this.allMedicine[i].dragHebName;
        }
        // this.synchronizeActiveComponents();
      },
      err => (alert(err.message))
    );
  }
  JsonMedicine: any;

  detailsOfMedicine: string = "";
  pics: string = "";
  qentity: boolean = false;
  buy: boolean = false;
  medi: MedicineDetails;
  //בחירת תרופה מקבל אובייקט תרופה שנבחרה
  medicineSelected(medicine: any) {
    debugger;
    if (this.moreDetailsOnMedcine == false) {
      this.qentity = true;
      this.medi = medicine;
      if (medicine.activeComponentsCompareName) {
        this.JsonMedicine = JSON.stringify(medicine);
        this.detailsOfMedicine = "";
        this.detailsOfMedicine = JSON.parse(this.JsonMedicine);
      }
      this.synchronizeActiveComponents();
    } this.moreDetailsOnMedcine = false;
  }
  currentMedicine: any = null;
  //פרטים נוספים על התרופה
  medicineMoreDetails(medicine: any, event) {
    debugger;
    this.add = false;
    event.preventDefault();
    this.currentMedicine = medicine;
    this.moreDetailsOnMedcine = true;
  }
  // סורק ברקוד
  activeCamera: boolean = false;
  startScaningBarcode() {
    this.activeCamera = true;
    let vm = this;
    let found = false;
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#camera_open')
      },
      debug: {
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: false,
        showPattern: false
      },
      locate: true,
      decoder: {
        readers: ["code_128_reader", 'upc_reader', 'ean_reader']
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.onDetected(data => {
        if (found) return;
        found = true;
        vm.activeCamera = false;
        Quagga.stop();
        console.log(data.codeResult.code);
        vm.MedicineName.setValue(data.codeResult.code);
        console.log(vm.MedicineName)
      })
      Quagga.start();
    });
  }

  //פונקציה הבודקת את אופן הנטילה עם/בלי/אחרי אוכל 
  howToTake(id: number) {
    this.food = id;
  }
  //מייצר את המערך שלתוכו יכנס שעות לתזכור  
  frequencyonday(id: number) {
    this.hoursToScheduler = (new Array(id)).fill(0);
    this.index = id;
  }
  //פו להפיכת כל מערך שעות לתזכור למחרוזת
  converToString() {
    for (var i = 0; i < this.hoursToScheduler.length; i++)
      this.hourArr += this.hoursToScheduler[i] + "@";
  }
  //פו הוספה למלאי
  mc: MedicineCart;
  addStock() {
    // בדיקה האם התרופה היא תרופה המתנה לקניה
    // 
    //יכנס לסל מאוחר יותר
    //1.מציאת קוד של סל תרופות הראשונה בעלת חומר פעיל זהה
    //2.העתקת הנתונים של תרופה זו לתרופה החדשה 

    for (var i = 0; i < this.listMedicine.length; i++) {
      if (this.listMedicine[i].IdMedicineCart == this.edit) {
        this.mc = this.listMedicine[i];
        break;
      }
    }
    //התרופה הקודמת ממתינה לקניה
    if (this.mc.TotalQuantity == null) {
      this.mc.IdUserMedicineCart = this.userSer.getCurrentUser();
      this.mc.Medicine = this.JsonMedicine;
      this.mc.TotalQuantity = this.TotalQuantity.value;
      this.mc.MediicneStatus = "Active";
      //עריכת תרופה בסל תרופות של הלקוח
      this.medicineCartSer.updateMedicineToCart(this.mc).subscribe(
        data => { this.arr = data },
        err => { alert(err.message) });
    }
    else {
      this.MedicineDetails = new MedicineCart(
        this.autoId++,
        this.userSer.getCurrentUser(),
        this.JsonMedicine,
        this.mc.Amount,
        this.mc.Frequency,
        this.mc.FrequencyOnDay,
        this.mc.Food,
        this.mc.NumDateToTake,
        this.mc.TotalQuantity,
        "Stock"
      );
      this.save();
    }

  }
  changeDosage() {
    //changeDosage
    //this.update = false;
    // debugger;
    //שליחה לקומפוננטת עריכה
    this.router.navigate(["/editMedicine/", this.edit]);
  }
  //סנכרון סל תרופות על פי מרכיב הפעיל = השפעה זהה
  synchronizeActiveComponents() {
    //סנכרון לפי מרכיב פעיל
    //לקבל את סל תרופות של הלקוח
    //לעבור על כל הסל
    //אם נתקלים בתרופה שהחומר הפעיל שלה זהה לתרופה שכעת רוצים להכניס
    //1.הודעה למשתמש שקיימת תרופה בעלת השפעה זהה=חומר פעיל זהה
    //2.שתי אפשרויות:א:לשמור את התרופה למאוחר יותר-מלאי ב: לשינוי מינון של התרופה
    let count = 0;
    let active;
    let jactive = this.detailsOfMedicine["activeComponentsCompareName"];
    for (var i = 0; i < this.listMedicine.length; i++) {
      active = JSON.parse(this.listMedicine[i].Medicine).activeComponentsCompareName;
      if (jactive == active) {
        count++;
        if (count == 1) {
          //שמירה של התרופה הנוכחית למקרה שירצה לשנות מינון
          this.edit = this.listMedicine[i].IdMedicineCart;
        }
      }
    }
    if (count >= 1) {
      this.generic = true;
      this.add = false;
    }
    else {
      this.add = true
      this.generic = false;
    }
  }
  //#endregion
  //שמירת הנתונים

  checkStatus() {
    debugger;
    //if(this.edit.)
    var m = this.listMedicine.find(x => x.IdMedicineCart == this.edit);
    if (m != null) {
      //כמות תרופה גנרית הראשונה שווה 0 ז"א ממתינה לקניה
      if (m.TotalQuantity == 0 || m.TotalQuantity == null && this.TotalQuantity.value > 0 && this.generic == true) {
        //צריך לשנות את הנתונים
        return "Active";
      }
    }
    else
      if (this.TotalQuantity.value > 0 && this.generic == true) {
        return "Stock";
      }
      else
        //פעיל- נוטל כרגע את התרופה
        if (this.TotalQuantity.value > 0) {
          return "Active";
        }
        else
          //ממתין לקניה
          if (this.TotalQuantity.value == 0 || this.TotalQuantity.value == null) {
            return "Wait";
          }
  }
  save() {
    debugger;
    if (this.numDays != 999)
      this.numDays = this.dateNumber.value;
    var status = this.checkStatus();
    //שליחה לפו חישוב הפרשי תאריכים
    // this.numDaysToTake = this.numDaysToScheduler(this.TillDate.value, this.UntillDate.value);
    //this.listMedicine
    if (this.edit == 0) {
      //שליחה לפו שתמיר את המערך למחרוזת
      this.converToString();
      //יצירת נתונים על תרופה בסל התרופות
      this.MedicineDetails = new MedicineCart(
        this.autoId++,
        this.userSer.getCurrentUser(),
        this.JsonMedicine,
        this.Amount.value,
        this.Frequency.value,
        this.hourArr,
        this.food,
        this.numDays,
        this.TotalQuantity.value,
        status
      );
    }
    debugger;
    //הוספת התרופה לסל תרופות של הלקוח
    this.medicineCartSer.AddMedicineToCart(this.MedicineDetails)
      .pipe(tap(() => this.router.navigateByUrl("medicineCart")))
      .subscribe(
        data => { this.arr = data },
        err => { alert(err.message) });

    //ריקון הפקדים
    this.medicineDetailsForm.reset();
    //הפניה לדף סל תרופות
    //   this.router.navigate(["/medicineCart/"]);
    // ;
  }
  //יצירת פורום 
  createForm() {
    return new FormGroup({
      MedicineName: new FormControl("", [Validators.required]),
      Amount: new FormControl("", [Validators.required, Validators.min(1), Validators.max(10)]),
      Frequency: new FormControl("", [Validators.required]),
      TotalQuantity: new FormControl("", [Validators.required]),
      dateNumber: new FormControl("", Validators.required),
      IfFood: new FormControl("", [Validators.required])
    });
  }
  Till(status: number) {
    debugger;
    if (status == 1) {
      this.limitedTimeBoolian = true;
    }
    else {
      this.limitedTimeBoolian = false;
      this.numDays = 999;
    }
  }
  ngOnInit() {
    this.medicineDetailsForm = this.createForm();
    this.MedicineName.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      filter(val => typeof val !== 'object')
    ).subscribe(medicfromdoc => {
      this.page = 1;
      console.log(medicfromdoc);

      this.fillArr(medicfromdoc);
    })
  }
  displayMedicine(medicine: MedicineDetails) {
    return medicine.dragHebName;
  }

  timeToTake: boolean;
  frequency: number;


}
export class PopoverExampleComponent {
  html = '<span class="btn btn-danger waves-light">{{currentMedicine.activeComponentsCompareName}}</span>';
}