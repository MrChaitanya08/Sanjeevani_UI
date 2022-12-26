import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rating-graph',
  templateUrl: './rating.graph.component.html',
  styleUrls: ['./rating.graph.component.scss']
})
export class RatingGraphComponent implements OnInit {

  averageRating = 0;
  ratingCount = [1, 2, 3, 4, 5];
  ratingPercentage = {};
  _ratings = [];
  @Input() ratingName: string;
  @Input() set ratings(value: any) {
    this._ratings = value;
    //if (value && value.length > 0) {
      const ratingSum = this._ratings.reduce((sum, current) =>
      sum + current, 0
    );
    this.averageRating = ratingSum > 0 ? ratingSum / this._ratings.length : 0;
      this.setRatingPercentage();
    //}
  }

  constructor() { }

  ngOnInit() {

  }

  setRatingPercentage() {
    this.ratingCount.forEach(item => {
      this.ratingPercentage[item] = this.getRatingPercentage(item);
    });
  }
  getRatingPercentage(rating: number) {
    const ratings = this._ratings.filter(x => x == rating);
    if (ratings.length == 0 || this._ratings.length == 0) {
      return 0;
    } else {
      return Math.round((ratings.length / this._ratings.length) * 100);
    }

  }

}
