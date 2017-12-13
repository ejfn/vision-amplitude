import { Chart } from '../api/types';
import { createAction } from './action';

export const updateChartList = createAction<'vision-amplitude/charts/updateList', Array<Chart>>(
  'vision-amplitude/charts/updateList'
);

export const updateChart = createAction<'vision-amplitude/charts/update', Chart>(
  'vision-amplitude/charts/update'
);
