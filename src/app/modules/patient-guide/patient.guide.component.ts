import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-patient-guide',
  templateUrl: './patient.guide.component.html',
  styleUrls: ['./patient.guide.component.scss']
})
export class PatientGuideComponent implements OnInit, AfterViewInit {

  showMenu = "generalinfo";
  fragmentUrl: string;
  isMobileDevice: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.setDeviceIsMobile();
    this.route.params.subscribe(
      param => {
        if (param['fragment']) {
          this.fragmentUrl = param['fragment'];
        }
      });
  }

  private setDeviceIsMobile(): void {
    const media = window.matchMedia("(min-width:1200px)");
    this.isMobileDevice = media && media.matches ? false : true;
  }
  hideShowMenu(menuName: string) {
    this.showMenu = menuName;
  }
  ngAfterViewInit() {
    if (this.fragmentUrl) {
      let elem = document.getElementById(this.fragmentUrl);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: 'start', inline: 'nearest' });
      }
    }
  }

}
