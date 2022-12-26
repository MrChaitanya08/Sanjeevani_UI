import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-health-packages',
  templateUrl: './health.packages.component.html',
  styleUrls: ['./health.packages.component.scss']
})
export class HealthPackageComponent implements OnInit {
 
  healthRowClass = "d-none d-md-flex row health-row-middle";
  constructor() { }

  ngOnInit() {
   
  }

}
