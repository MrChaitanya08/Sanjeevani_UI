import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-cardiaccare',
  templateUrl: './specialities.cardiaccare.component.html',
  styleUrls: ['./specialities.cardiaccare.component.scss']
})
export class SpecialitiesCardiacareComponent implements OnInit,AfterViewInit {

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
