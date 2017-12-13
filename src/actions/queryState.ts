import { QueryPeriod } from '../store';
import { createAction } from './action';

export interface StartQueryPayload {
  period: QueryPeriod;
  queryId: string;
}

export const startQuery = createAction<'vision-amplitude/queryState/startQuery', StartQueryPayload>(
  'vision-amplitude/queryState/startQuery'
);

export interface CompleteQueryPayload extends StartQueryPayload {
  error?: string;
}

export const completeQuery = createAction<'vision-amplitude/queryState/completeQuery', CompleteQueryPayload>(
  'vision-amplitude/queryState/completeQuery'
);
