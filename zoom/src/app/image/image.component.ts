import {Component, OnInit, ViewChild} from '@angular/core';
import {images} from '../../product';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {
  photos = images;
  selected = this.photos[0];
  Lens = {'width.px': 0, 'height.px': 0, 'left.px': 0, 'top.px': 0};
  Zoom = {on: false, scaleX: 0, scaleY: 0, 'width.px': 0, 'height.px': 0, 'backgroundImage': 'url(' + this.selected.original + ')'};
  @ViewChild('photo') photo;
  @ViewChild('zoom') zoom;
  @ViewChild('lens') lens;

  constructor() {
  }

  select(x) {
    this.selected = x;
  }

  public zoomInit() {
    const image = this.photo.nativeElement;
    console.log(image.width, image.clientWidth);
    this.Zoom.on = true;
    this.Zoom['width.px'] = this.zoom.nativeElement.clientWidth + 50;
    this.Zoom['height.px'] = this.zoom.nativeElement.clientHeight + 50 ;
    this.Zoom.scaleX = this.Zoom['width.px'] / this.selected.width;
    this.Zoom.scaleY = this.Zoom['height.px'] / this.selected.height;
    this.Lens['width.px'] = (image.width * this.Zoom.scaleX);
    this.Lens['height.px'] = (image.height * this.Zoom.scaleY);
  }

  public moveLens(e) {
    const pos = this.getCursorPos(e);
    let x = pos.x - (this.lens.nativeElement.offsetWidth / 2);
    let y = pos.y - (this.lens.nativeElement.offsetHeight / 2);
    if (x > this.photo.nativeElement.width - this.lens.offsetWidth) {
      x = this.photo.nativeElement.width - this.lens.nativeElement.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > this.photo.nativeElement.height - this.lens.nativeElement.offsetHeight) {
      y = this.photo.nativeElement.height - this.lens.nativeElement.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    this.Lens['left.px'] = x;
    this.Lens['top.px'] = y;
    this.Zoom['backgroundPosition'] = -(x / this.Zoom.scaleX) + 'px -' + (y / this.Zoom.scaleY) + 'px';
  }

  public getCursorPos(e) {
    let x: number, y: number;
    const F = this.photo.nativeElement.getBoundingClientRect();
    x = e.pageX - F.left;
    y = e.pageY - F.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x: x, y: y};
  }

  public check() {
    console.log('zoom', this.Zoom);
    console.log('lens', this.Lens);
  }

  ngOnInit() {
  }

}
