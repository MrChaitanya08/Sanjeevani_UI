import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-newborn',
  templateUrl: './specialities.newborn.component.html',
  styleUrls: ['./specialities.newborn.component.scss']
})
export class SpecialitiesNewBornComponent implements OnInit,AfterViewInit {

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
