import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.19.component.html',
  styleUrls: ['./covid.19.component.scss']
})
export class Covid19Component implements OnInit {

  selectedFaq = '';

  constructor() { }

  ngOnInit() {
  }

  selectFaq(faq){
    if(this.selectedFaq==faq){
      this.selectedFaq = '';
    } else{
      this.selectedFaq = faq;
    }
    
  }
 
}
