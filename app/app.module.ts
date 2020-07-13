import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatCheckboxModule, MatIconModule, MatRadioModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './Components/login/login.component';
import { SubscribeComponent } from './Components/subscribe/subscribe.component';
import { MedicineCartComponent } from './Components/medicine-cart/medicine-cart.component';
import { AddMedicineComponent } from './Components/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './Components/edit-medicine/edit-medicine.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HelpComponent } from './Components/help/help.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './Components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from './pipes/translate.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { StockComponent } from './Components/stock/stock.component';
import { AlertsComponent } from "./Components/alerts/alerts.component";
import { ListAlertsComponent } from './Components/list-alerts/list-alerts.component';

import { DropdownModule } from 'angular-bootstrap-md';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatVideoModule } from 'mat-video';
import 'hammerjs';





// import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscribeComponent,
    MedicineCartComponent,
    TranslatePipe,
    NotFoundComponent,
    AddMedicineComponent,
    EditMedicineComponent,
    HelpComponent,
    HomeComponent,
    StockComponent,
    AlertsComponent,
    ListAlertsComponent,
  ],
  imports: [
    //BrowserAnimationsModule,
    // MatVideoModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule, MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    // MatIconButtonModule,
    MatRadioModule,
    // Quagga,
    DropdownModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }


