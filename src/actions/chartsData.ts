import { Chart, ChartData } from '../api/types';
import { QueryPeriod } from '../store';
import { createAction } from './action';

export interface UpdateChartDataPayload {
  period: QueryPeriod;
  id: string;
  chartData: ChartData;
}

export const updateChartData = createAction<'vision-amplitude/chartsData/update', UpdateChartDataPayload>(
  'vision-amplitude/chartsData/update'
);

export interface InvalidateChartDataPayload {
  period: QueryPeriod;
  chart: Chart;
}

export const invalidateChartData = createAction<'vision-amplitude/chartsData/invalidate', InvalidateChartDataPayload>(
  'vision-amplitude/chartsData/invalidate'
);

export const invalidateChartDataList = createAction<'vision-amplitude/chartsData/invalidateList', QueryPeriod>(
  'vision-amplitude/chartsData/invalidateList'
);
