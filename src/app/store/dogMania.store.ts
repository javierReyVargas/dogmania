import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import { Dog } from '../interfaces';
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
};

const initialState: DogManiaState = {
  allDogs: [],
  filterStringBreed: '',
  filterStringSubBreed: '',
  selectedDog: null,
  selectedSubBreed: null,
  isLoading: false,
  error: null,
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
