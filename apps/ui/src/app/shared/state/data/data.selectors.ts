import {createFeatureSelector, createSelector} from '@ngrx/store';

import {dataFeatureKey, DataState} from './data.reducers';

const selectDataFeature = createFeatureSelector<DataState>(dataFeatureKey);

export const selectUser = createSelector(selectDataFeature, (state) => state.user);

export const selectEmployees = createSelector(selectDataFeature, (state) => state.employees);

export const selectProjects = createSelector(selectDataFeature, (state) => state.projects);
