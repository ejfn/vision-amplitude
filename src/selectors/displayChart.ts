import { createSelector } from 'reselect';

import { QueryData } from '../api/types';
import { DisplayChart } from '../components/Main';
import { AppState, Chart, QueryPeriod, QueryState, ReduxIndex } from '../store';

export const selectDisplayChartList = createSelector(
  (state: AppState) => state.charts,
  (state: AppState, period: QueryPeriod) => state.queryData[period],
  (state: AppState, period: QueryPeriod) => state.queryState[period],
  (
    charts: Array<Chart>,
    queryData: ReduxIndex<QueryData>,
    queryState: ReduxIndex<QueryState>
  ): Array<DisplayChart> => {

    return charts.map((chart: Chart) => {
      // transform to Victory data
      const chartData = queryData[chart.queryId];
      const state = queryState[chart.queryId];
      return {
        chart,
        chartData,
        state
      };
    });
  }
);
