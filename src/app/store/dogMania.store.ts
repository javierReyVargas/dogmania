import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import { Dog } from '../interfaces';

type DogManiaState = {
  allDogs: Dog[];
  filterStringBreed: string;
  filterStringSubBreed: string;
  filteredDogs: Dog[];
  selectedDog: Dog | null;
  selectedSubBreed: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: DogManiaState = {
  allDogs: [],
  filterStringBreed: '',
  filterStringSubBreed: '',
  filteredDogs: [],
  selectedDog: null,
  selectedSubBreed: null,
  isLoading: false,
  error: null,
};

export const dogManiaStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods( (store) => ({
    updateFilterStringBreed(query: string): void {
      patchState(store, (state) => ({filterStringBreed: query}))
    }
  }))
);
