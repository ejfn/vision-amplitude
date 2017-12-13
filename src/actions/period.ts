import { QueryPeriod } from '../store';
import { createAction } from './action';

export const updatePeriod = createAction<'vision-amplitude/period/update', QueryPeriod>(
  'vision-amplitude/period/update'
);
