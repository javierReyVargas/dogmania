import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  onSelectedBreed = output<Dog>();

  selectedBreed(dog: Dog) {
    this.onSelectedBreed.emit(dog);
  }
}
