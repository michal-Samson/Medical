import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SubscribeComponent } from './Components/subscribe/subscribe.component';
import { MedicineCartComponent } from './Components/medicine-cart/medicine-cart.component';
import { AddMedicineComponent } from './Components/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './Components/edit-medicine/edit-medicine.component';
import { HelpComponent } from './Components/help/help.component';
import { HomeComponent } from './Components/home/home.component';
import { StockComponent } from './Components/stock/stock.component';
import { AlertsComponent } from './Components/alerts/alerts.component';
import { ListAlertsComponent } from './Components/list-alerts/list-alerts.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "subscribe/:edit", component: SubscribeComponent },
  { path: "subscribe", component: SubscribeComponent },
  { path: "stock", component: StockComponent },
  { path: "medicineCart", component: MedicineCartComponent },
  { path: "addMedicine", component: AddMedicineComponent },
  { path: "editMedicine/:edit", component: EditMedicineComponent },
  { path: "help", component: HelpComponent },
  { path: "alerts", component: AlertsComponent },
  { path: "listAlerts", component: ListAlertsComponent },
  { path: "notFound", component: NotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
