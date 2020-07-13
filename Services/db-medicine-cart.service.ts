import { Injectable } from '@angular/core';
import { MedicineCart } from '../Classes/medicine-cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DbMedicineCartService {

  constructor(private ser: HttpClient) { }
  //כתובת שרת
  URL = "http://localhost:51335/api/MedicineCart/";

  //רשימת סל תרופות לפי לקוח
  getMedicineCartList(id: string): Observable<MedicineCart[]> {
    return this.ser.get<MedicineCart[]>(this.URL + "GetMedicineCart/" + id);
  }
  //הוספת תרופה לסל תרופות של הלקוח
  AddMedicineToCart(medicineCart: MedicineCart): Observable<MedicineCart[]> {
    return this.ser.post<MedicineCart[]>(this.URL + "AddMedicineToCart/", medicineCart);
  }
  //הסרת תרופה מסל התרופות
  RemoveMedicine(id: number): Observable<MedicineCart[]> {
    return this.ser.delete<MedicineCart[]>(this.URL + "DeleteMedicine/" + id);
  }
  getMedicineByCartId(id: number): Observable<MedicineCart> {
    return this.ser.get<MedicineCart>(this.URL + "getMedicineByCartId/" + id)
  }
  //עדכון תרופה לפי לקוח ולפי קוד תרופה
  updateMedicineToCart(medicineCart: MedicineCart): Observable<MedicineCart[]> {
    return this.ser.put<MedicineCart[]>(this.URL + "updateMedicineToCart/" + medicineCart.IdMedicineCart, medicineCart);
  }
  //הסרת סל התרופות של לקוח
  DeleteUserMedicineCart(idUser: string): Observable<MedicineCart[]> {
    return this.ser.delete<MedicineCart[]>(this.URL + "DeleteUserMedicineCart/" + idUser)
  }
}
