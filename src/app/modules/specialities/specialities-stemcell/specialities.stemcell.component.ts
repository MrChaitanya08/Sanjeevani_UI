import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-stemcell',
  templateUrl: './specialities.stemcell.component.html',
  styleUrls: ['./specialities.stemcell.component.scss']
})
export class SpecialitiesStemcellComponent implements OnInit,AfterViewInit {

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
