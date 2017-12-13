import * as actions from '../actions/chart';
import { Chart } from '../store';
import { INITIAL_STATE } from './initialState';

export function chartReducer(
  state: Array<Chart> = INITIAL_STATE.charts,
  action:
    typeof actions.updateChartList.shape
): Array<Chart> {
  switch (action.type) {
    case actions.updateChartList.type:
      return action.payload;
    default:
      return state;
  }
}
