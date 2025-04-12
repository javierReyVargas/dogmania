import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { dogManiaStore } from '../../store/dogMania.store';
import {MatCardModule} from '@angular/material/card';
import { BreedComponent } from '../../components/breed/breed.component';
import { DogImgComponent } from '../../components/dog-img/dog-img.component';
import { SubBreedsComponent } from '../../components/sub-breeds/sub-breeds.component';

@Component({
  selector: 'app-main',
  imports: [
    SearchComponent,
    MatCardModule,
    BreedComponent,
    DogImgComponent,
    SubBreedsComponent,
  ],
  providers: [dogManiaStore],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent implements OnInit {
  readonly store = inject(dogManiaStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
  getImagesBySubBreed(subBreed: string): void {
    this.store.loadImagesBySubBreed({breed: this.store.selectedDog()!.breed, subBreed});
  }
}
