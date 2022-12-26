import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-surgry',
  templateUrl: './specialities.surgery.component.html',
  styleUrls: ['./specialities.surgery.component.scss']
})
export class SpecialitiesSurgeryComponent implements OnInit,AfterViewInit {

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
