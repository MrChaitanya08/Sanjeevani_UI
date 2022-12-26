import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-room',
  templateUrl: './facilities.room.component.html',
  styleUrls: ['./facilities.room.component.scss']
})
export class FacilitiesRoomComponent implements OnInit,AfterViewInit {

  constructor( ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('.flexslider').flexslider({
      animation: "fade",
      directionNav: true,
      controlNav: false,
      slideshowSpeed:3000
    });
  }

}
