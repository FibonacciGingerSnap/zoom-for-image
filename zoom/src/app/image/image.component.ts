import { Component, OnInit } from '@angular/core';
import { images } from '../../product';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {
  photos = images;

  constructor() { }

  ngOnInit() {
    console.log (this.photos);
  }

}
