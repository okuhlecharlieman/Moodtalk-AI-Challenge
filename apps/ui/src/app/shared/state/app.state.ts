import {dataFeatureKey, DataState} from './data/data.reducers';
import {visualFeatureKey, VisualState} from './visual/visual.reducers';

export interface AppState {
  [dataFeatureKey]: DataState;
  [visualFeatureKey]: VisualState;
}
