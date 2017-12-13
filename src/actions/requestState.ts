import { QueryPeriod } from '../store';
import { createAction } from './action';

export interface RequestStatePayload {
  period: QueryPeriod;
  id: string;
}

export const startRequest = createAction<'vision-amplitude/requestState/startRequest', RequestStatePayload>(
  'vision-amplitude/requestState/startRequest'
);

export interface EndRequestPayload extends RequestStatePayload {
  error?: string;
}

export const endRequest = createAction<'vision-amplitude/requestState/endRequest', EndRequestPayload>(
  'vision-amplitude/requestState/endRequest'
);
