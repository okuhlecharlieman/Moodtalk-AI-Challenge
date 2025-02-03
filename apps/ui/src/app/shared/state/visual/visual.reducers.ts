import {createReducer, on} from '@ngrx/store';
import {startLoading, stopLoading} from './visual.actions';

export interface VisualState {
  isLoading?: boolean;
}

export const visualFeatureKey = 'visual';

const initialAppState: VisualState = {
  isLoading: false
};

export const visualReducer = createReducer(
  initialAppState,
  on(startLoading, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(stopLoading, (state) => {
    return {
      ...state,
      isLoading: false
    };
  })
);
