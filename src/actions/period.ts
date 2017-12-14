import { QueryPeriod } from '../store';
import { createAction } from './action';

export const updateQueryPeriod = createAction<'vision-amplitude/period/update', QueryPeriod>(
  'vision-amplitude/period/update'
);
