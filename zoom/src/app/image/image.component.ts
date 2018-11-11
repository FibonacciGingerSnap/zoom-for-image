import {Component, OnInit, ViewChild} from '@angular/core';
import { images } from '../../product';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {
  photos = images;
  selected = this.photos[0];
  Lens = { 'width.px' : 0 , 'height.px' : 0, 'left.px' : 0, 'top.px' : 0 };
  Zoom = { on: false, scaleX: 0, scaleY: 0, 'width.px' : 0 , 'height.px' : 0 , 'backgroundImage' : 'url(' + this.selected.original + ')' };
  @ViewChild('photo') img;
  @ViewChild('zoom') zoom;
  constructor() { }

  select(x) {
    this.selected = x;
  }
  zooming () {
    const F = this.img.nativeElement.getBoundingClientRect();
    this.Zoom.on = true;
    this.Zoom.scaleX = this.Zoom['width.px'] / this.selected.width;
    this.Zoom.scaleY = this.Zoom['height.px'] / this.selected.height;
    this.Zoom['width.px'] = this.zoom.nativeElement.clientWidth;
    this.Zoom['height.px'] = this.zoom.nativeElement.clientHeight;
    console.log(this.Zoom );
    this.Lens['width.px'] = (F.width * this.Zoom.scaleX);
    this.Lens['height.px'] = (F.height * this.Zoom.scaleY);
    console.log(this.Lens);
  }
  getCursorPos(e) {
    let x: number, y: number;
    const F = this.img.nativeElement.getBoundingClientRect();
    x = e.pageX - F.left;
    y = e.pageY - F.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    this.Lens['top.px'] = y;
    this.Lens['left.px'] = x;
    this.Zoom['backgroundPosition'] = -(x / this.Zoom.scaleX) + 'px -' + (y / this.Zoom.scaleY) + 'px';
    console.log(this.Lens);
  }
  ngOnInit() {
    console.log (this.img);
  }

}
