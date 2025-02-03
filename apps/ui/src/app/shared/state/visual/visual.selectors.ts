import {createFeatureSelector, createSelector} from '@ngrx/store';

import {visualFeatureKey, VisualState} from './visual.reducers';

const selectVisualFeature = createFeatureSelector<VisualState>(visualFeatureKey);

export const selectIsLoading = createSelector(selectVisualFeature, (state) => state.isLoading);
