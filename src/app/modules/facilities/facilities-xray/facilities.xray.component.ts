import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-xray',
  templateUrl: './facilities.xray.component.html',
  styleUrls: ['./facilities.xray.component.scss']
})
export class FacilitiesXRayComponent implements OnInit,AfterViewInit {

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
