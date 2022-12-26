import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-op',
  templateUrl: './facilities.op.component.html',
  styleUrls: ['./facilities.op.component.scss']
})
export class FacilitiesOPComponent implements OnInit,AfterViewInit {

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
