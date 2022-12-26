import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-medicaltourism',
  templateUrl: './specialities.medicaltourism.component.html',
  styleUrls: ['./specialities.medicaltourism.component.scss']
})
export class SpecialitiesMedicalTourismComponent implements OnInit,AfterViewInit {

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
