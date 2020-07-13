import { Component, OnInit } from '@angular/core';
import { ExternalInterfacesService } from 'src/app/Services/external-interfaces.service';
import { DbSceduleService } from 'src/app/Services/db-scedule.service';

import { DbUserDetailsService } from 'src/app/Services/db-user-details.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  action: Array<number>;
  arr: Array<number> = [];
  idMedicineCart: number = 1;
  idScedule: number = 1;
  constructor(
    public serData: ExternalInterfacesService,
    public serScediule: DbSceduleService,
    public userSer: DbUserDetailsService
  ) {

  }
  name: string = this.userSer.getCurrentUser();

  sendToServer(action: number) {
    debugger;
    this.arr.fill(this.idMedicineCart);
    this.arr.fill(this.idScedule);
    this.arr.fill(action)
    debugger;
    this.serScediule.tookStatus(this.arr).subscribe(
      data => { this.action = data },
      err => { alert(err.message) });
  }
  ngOnInit() {
  }

}
