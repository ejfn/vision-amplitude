import * as actions from '../actions/chartsData';
import { ChartData } from '../api/types';
import { QueryPeriod, ReduxIndex } from '../store';
import { INITIAL_STATE } from './initialState';

export function chartsDataReducer(
  state: Record<QueryPeriod, ReduxIndex<ChartData>> = INITIAL_STATE.chartsData,
  action:
    typeof actions.updateChartData.shape
): Record<QueryPeriod, ReduxIndex<ChartData>> {
  switch (action.type) {
    case actions.updateChartData.type:
      {
        const { period, id, chartData } = action.payload;
        const periodData = {
          ...state[period],
          [id]: chartData
        };
        return {
          ...state,
          [period]: periodData
        };
      }
    default:
      return state;
  }
}
