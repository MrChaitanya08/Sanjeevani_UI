import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './facilities.all.component.html',
  styleUrls: ['./facilities.all.component.scss']
})
export class FacilitiesAllComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    this.checkElementVisibility();
  }
  checkElementVisibility() {
    const firstFacRow = this.getIntersectionObserver();
    firstFacRow.observe(document.querySelector("#first-fac-row"));

    const secondFacRow = this.getIntersectionObserver();
    secondFacRow.observe(document.querySelector("#second-fac-row"));

    const thirdFacRow = this.getIntersectionObserver();
    thirdFacRow.observe(document.querySelector("#third-fac-row"));

  }

  getIntersectionObserver() {
    const self = this;
    return new IntersectionObserver(
      async function (entries) {
        const entry = entries[0];
        if (entry.isIntersecting === true) {
          await self.delayFunction(500);
          self.attachAnimation(entry.target.firstElementChild);
          await self.delayFunction(500);
          self.attachAnimation(entry.target.children[1]);
          await self.delayFunction(500);
          self.attachAnimation(entry.target.lastElementChild);
        }
      },
      { threshold: [0.2] });
  }
  attachAnimation(element: any) {
    element.classList.remove('display-n');
    element.classList.add('animate__animated', 'animate__zoomIn', 'animate__fast');
  }

  delayFunction(ms:any){
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  navigateToFacilities(facility) {
    this.route.navigateByUrl('/facilities/' + facility);
  }
}
