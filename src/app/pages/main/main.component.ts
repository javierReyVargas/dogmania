import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { dogManiaStore } from '../../store/dogMania.store';
import {MatCardModule} from '@angular/material/card';
import { BreedSubBreedsComponent } from '../../components/breed-sub-breeds/breed-sub-breeds.component';
import { DogImgComponent } from '../../components/dog-img/dog-img.component';

@Component({
  selector: 'app-main',
  imports: [
    SearchComponent,
    MatCardModule,
    BreedSubBreedsComponent,
    DogImgComponent,
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
}
