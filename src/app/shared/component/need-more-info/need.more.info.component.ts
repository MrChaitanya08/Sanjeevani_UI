import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-needmoreinfo',
  templateUrl: './need.more.info.component.html',
  styleUrls: ['./need.more.info.component.scss']
})
export class NeedMoreInfoComponent implements OnInit {
 
  @Input() pageName:string;
  disableBtn:boolean = true;
  needMoreInfo: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.needMoreInfo = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  submitNeedMoreInfo(){
    alert('This functionality is coming soon.')
  }

}
