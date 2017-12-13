import * as actions from '../actions/charts';
import { Chart } from '../api/types';
import { ReduxIndex } from '../store';
import { INITIAL_STATE } from './initialState';

export function chartsReducer(
  state: ReduxIndex<Chart> = INITIAL_STATE.charts,
  action:
    typeof actions.updateChartList.shape |
    typeof actions.updateChart.shape
): ReduxIndex<Chart> {
  switch (action.type) {
    case actions.updateChart.type:
      {
        return {
          ...state,
          [action.payload.id]: action.payload
        };
      }
    case actions.updateChartList.type:
      {
        return action.payload.reduce(
          (p: ReduxIndex<Chart>, c: Chart) => {
            return {
              ...p,
              [c.id]: c
            };
          },
          state);
      }
    default:
      return state;
  }
}
