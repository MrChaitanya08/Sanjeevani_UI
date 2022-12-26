import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-cancercare',
  templateUrl: './specialities.cancercare.component.html',
  styleUrls: ['./specialities.cancercare.component.scss']
})
export class SpecialitiesCancercareComponent implements OnInit,AfterViewInit {

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
