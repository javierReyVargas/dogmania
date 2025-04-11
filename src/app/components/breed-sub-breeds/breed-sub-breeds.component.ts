import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { Dog } from '../../interfaces';


@Component({
  selector: 'breed-sub-breeds',
  imports: [MatChipsModule],
  templateUrl: './breed-sub-breeds.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedSubBreedsComponent {
  filteredDogs = input<Dog[]>([]);
}
