import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { Dog } from '../../interfaces';


@Component({
  selector: 'breed',
  imports: [MatChipsModule],
  templateUrl: './breed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedComponent {
  filteredDogs = input<Dog[]>([]);
  onSelectedBreed = output<Dog>();
  onSelectedSubBreed = output<string>();
  selectedDog = input<Dog | null>();

  selectedBreed(dog: Dog) {
    this.onSelectedBreed.emit(dog);
  }
  selectedSubBreed(subBreed: string) {
    this.onSelectedSubBreed.emit(subBreed);
  }
}
