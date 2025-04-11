import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dog-img',
  imports: [],
  templateUrl: './dog-img.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogImgComponent { }
