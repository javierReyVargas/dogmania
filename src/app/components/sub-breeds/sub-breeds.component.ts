import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'sub-breeds',
  imports: [MatChipsModule],
  templateUrl: './sub-breeds.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubBreedsComponent {
  listSubBreeds = input<string[]>([]);
  selectedSubBreed = output<string>();
}
