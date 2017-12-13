import { Query } from '../api/types';
import { createAction } from './action';

export const updateQueryList = createAction<'vision-amplitude/query/updateList', Array<Query>>(
  'vision-amplitude/query/updateList'
);

export const updateQuery = createAction<'vision-amplitude/query/update', Query>(
  'vision-amplitude/query/update'
);
