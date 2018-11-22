import {Component, OnInit} from '@angular/core';
import {images} from '../../product';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass'],
  animations: [
    trigger('cardAnimator', [
      transition('* => wobble', animate(1000, keyframes(kf.wobble))),
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => jello', animate(1000, keyframes(kf.jello))),
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight))),
      transition('* => slideOutLeft', animate(1000, keyframes(kf.slideOutLeft))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
      transition('* => flipOutY', animate(1000, keyframes(kf.flipOutY))),
    ])
  ]
})
export class ImageComponent implements OnInit {
  photos = images;
  selected = this.photos[0];
  animationState: string;
  startAnimation(state) {
    console.log(state);
    if (!this.animationState) {
      this.animationState = state;
    }
  }
  resetAnimationState() {
    this.animationState = '';
    this.slide('next');
  }

  public slide(direction) {
    const index = this.photos.indexOf(this.selected);
    const array = this.photos.slice();
    direction === 'next' ? array.push(array.shift()) : array.unshift(array.pop());
    this.selected = array[index];
  }

  constructor() {
  }


  ngOnInit() {
  }

}
