import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-bloodbank',
  templateUrl: './facilities.bloodbank.component.html',
  styleUrls: ['./facilities.bloodbank.component.scss']
})
export class FacilitiesBloodBankComponent implements OnInit,AfterViewInit {

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
