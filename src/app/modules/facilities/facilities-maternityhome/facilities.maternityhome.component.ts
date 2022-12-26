import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-maternityhome',
  templateUrl: './facilities.maternityhome.component.html',
  styleUrls: ['./facilities.maternityhome.component.scss']
})
export class FacilitiesMaternityHomeComponent implements OnInit,AfterViewInit {

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
