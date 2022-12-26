import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-dialysis',
  templateUrl: './facilities.dialysis.component.html',
  styleUrls: ['./facilities.dialysis.component.scss']
})
export class FacilitiesDialysisComponent implements OnInit,AfterViewInit {

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
