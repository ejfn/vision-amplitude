import { Chart } from '../store';
import { createAction } from './action';

export const updateChartList = createAction<'vision-amplitude/chart/updateList', Array<Chart>>(
  'vision-amplitude/chart/updateList'
);
