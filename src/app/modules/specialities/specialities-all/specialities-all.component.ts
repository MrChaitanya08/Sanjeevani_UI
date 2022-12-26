import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialities-all',
  templateUrl: './specialities-all.component.html',
  styleUrls: ['./specialities-all.component.scss']
})
export class SpecialitiesAllComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    this.checkElementVisibility();
  }
  checkElementVisibility() {
    const firstSpecRow = this.getIntersectionObserver();
    firstSpecRow.observe(document.querySelector("#first-spec-row"));

    const secondSpecRow = this.getIntersectionObserver();
    secondSpecRow.observe(document.querySelector("#second-spec-row"));

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

  navigateToSpecialities(speciality) {
    this.route.navigateByUrl('/specialities/' + speciality);
  }
}
