import { Chart, ChartData } from './api/types';

export interface ReduxIndex<T> {
  [key: string]: T | undefined;
}

export type QueryPeriod = '1W' | '2W' | '5W' | '13W' | '26W';

export interface AppState {
  period: QueryPeriod;
  charts: ReduxIndex<Chart>;
  chartsData: Record<QueryPeriod, ReduxIndex<ChartData>>;
  requestState: Record<QueryPeriod, ReduxIndex<RequestState>>;
}

export interface RequestState {
  isRequesting: boolean;
  error?: string;
}
