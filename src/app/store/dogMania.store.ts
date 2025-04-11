import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import { Dog, ImgDog } from '../interfaces';
import { computed, inject } from '@angular/core';
import { DogsService } from '../service/dogs.service';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

type DogManiaState = {
  allDogs: Dog[];
  filterStringBreed: string;
  filterStringSubBreed: string;
  selectedDog: Dog | null;
  selectedSubBreed: string | null;
  isLoading: boolean;
  error: string | null;
  allImages: ImgDog[];
};

const initialState: DogManiaState = {
  allDogs: [],
  filterStringBreed: '',
  filterStringSubBreed: '',
  selectedDog: null,
  selectedSubBreed: null,
  isLoading: false,
  error: null,
  allImages: [],
};

export const dogManiaStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods( (store, dogService = inject(DogsService)) => ({
    updateFilterStringBreed(query: string): void {
      patchState(store, (state) => ({filterStringBreed: query}))
    },
    updateFilterStringSubBreed(query: string): void {
      patchState(store, (state) => ({filterStringSubBreed: query}))
    },
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, (state) => ({isLoading: true}))),
        switchMap(() => dogService.getAllDogs()
          .pipe(
            tap( (allDogs: Dog[]) => {
              patchState(store, (state) => ({ allDogs, filteredDogs: allDogs, isLoading: false }))
            } )
          )
        ),
      )
    ),
    loadImagesByBreed: rxMethod<Dog>(
      pipe(
        tap((dog: Dog) => patchState(store, (state) => ({selectedDog: dog, isLoading: true}))),
        switchMap((dog: Dog) => dogService.getImagesByBreed(dog.breed)
          .pipe(
            tap((images: ImgDog[]) => {
              patchState(store, (state) => ({ allImages: images, isLoading: false }))
            })
          )
        ),
      )
    )
  })),
  withComputed( ({allDogs, filterStringBreed}) => ({
    filteredDogs: computed( () => {
      return allDogs().filter((dog: Dog) => {
        return dog.breed.toLowerCase().includes(filterStringBreed().toLowerCase());
      });
    })
  })),
);
