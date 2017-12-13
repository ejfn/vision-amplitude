import { QueryData } from '../api/types';
import { QueryPeriod } from '../store';
import { createAction } from './action';

export interface UpdateQueryDataPayload {
  period: QueryPeriod;
  queryId: string;
  queryData: QueryData;
}

export const updateQueryData = createAction<'vision-amplitude/queryData/update', UpdateQueryDataPayload>(
  'vision-amplitude/queryData/update'
);

export interface InvalidateQueryDataPayload {
  period: QueryPeriod;
  queryId: string;
}

export const invalidateQueryData = createAction<'vision-amplitude/queryData/invalidate', InvalidateQueryDataPayload>(
  'vision-amplitude/queryData/invalidate'
);

export interface InvalidateQueryDataListPayload {
  period: QueryPeriod;
  queryIds: Array<string>;
}

export const invalidateQueryDataList = createAction<'vision-amplitude/queryData/invalidateList', InvalidateQueryDataListPayload>(
  'vision-amplitude/queryData/invalidateList'
);
