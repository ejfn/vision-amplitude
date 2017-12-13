import { createSelector } from 'reselect';
import { AppState, Chart } from '../store';

export const selectQueryIds = createSelector(
  (state: AppState) => state.charts,
  (charts: Array<Chart>): Array<string> => {
    return charts.map((c: Chart) => c.queryId);
  }
);
