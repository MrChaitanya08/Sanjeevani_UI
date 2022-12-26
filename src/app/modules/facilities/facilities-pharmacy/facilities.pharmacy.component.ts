import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-pharmacy',
  templateUrl: './facilities.pharmacy.component.html',
  styleUrls: ['./facilities.pharmacy.component.scss']
})
export class FacilitiesPharmacyComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('.flexslider').flexslider({
      animation: "slide",
      directionNav: false,
      controlNav: false
    });
  }

}
