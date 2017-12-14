import { ColorScalePropType } from 'victory-native';
import { Query, QueryData } from './api/types';

export interface AppState {
  period: QueryPeriod;
  charts: Array<Chart>;
  queries: ReduxIndex<Query>;
  queryData: Record<QueryPeriod, ReduxIndex<QueryData>>;
  queryState: Record<QueryPeriod, ReduxIndex<QueryState>>;
}

export interface ReduxIndex<T> {
  [key: string]: T | undefined;
}

export type QueryPeriod = '1W' | '2W' | '5W' | '13W' | '26W';
export type ChartType = 'Line' | 'Bar' | 'Pie';

export interface Chart {
  title: string;
  queryId: string;
  chartType: ChartType;
  colorScale: ColorScalePropType;
}

export interface QueryState {
  isRequesting: boolean;
  error: string | undefined;
}
