import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { dogManiaStore } from '../../store/dogMania.store';
import { ImgDog } from '../../interfaces';
import {MatGridListModule} from '@angular/material/grid-list';



@Component({
  selector: 'dog-img',
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './dog-img.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogImgComponent {
  allImages = input<ImgDog[]>([]);
  breedName = input<string | null>(null);
  subBreedName = input<string>('');
}
