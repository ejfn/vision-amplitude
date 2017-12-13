import { createSelector } from 'reselect';

import { isEventsSegmentationQueryData } from '../api/eventsSegmentation';
import { QueryData } from '../api/types';
import { DataSet, DisplayChart } from '../components/Main';
import { AppState, Chart, ChartType, QueryPeriod, QueryState, ReduxIndex } from '../store';
import { DataObject } from '../typings/victory';

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
      const dataSet = transformChartData(queryData[chart.queryId], chart.chartType);
      const state = queryState[chart.queryId];
      return {
        chart,
        dataSet,
        state
      };
    });
  }
);

function transformChartData(queryData: QueryData | undefined, chartType: ChartType): DataSet | undefined {
  if (isEventsSegmentationQueryData(queryData)) {
    const data = queryData.data;
    const labels = data.seriesLabels.map((i: Array<string>) => i[1]);
    switch (chartType) {
      case 'Line':
      case 'Bar':
        {
          const chartData: Record<string, Array<DataObject>> = {};
          return labels.reduce(
            (p: Record<string, Array<DataObject>>, c: string, i: number) => {
              p[c] = data.xValues.map((x: string, j: number) => {
                const y = data.series[i][j];
                return { x, y };
              });
              return p;
            },
            chartData);
        }
      case 'Pie':
        {
          const chartData: Array<DataObject> = [];
          labels.reduce(
            (p: Array<DataObject>, x: string, i: number) => {
              const y = data.seriesCollapsed[i].value;
              p.push({ x, y });
              return p;
            },
            chartData);
          return chartData;
        }
      default:
        return undefined;
    }
  }
  return undefined;
}
