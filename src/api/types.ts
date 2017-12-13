export type MetricsOption = 'totals' | 'uniques' | 'avg' | 'pct_dau';
export type IterationOption = 1 | 7 | 30; // Daily | Weekly | Monthly
export type EntityType = 'event' | 'user';
export type Operator =
  'is' | 'is not' | 'contains' | 'does not contain' |
  'less' | 'less or equal' | 'greater' | 'greater or equal' |
  'set is' | 'set is not';

export interface EventQuery {
  event_type: string;
  filters?: Array<Filter>;
  group_by?: Array<GroupBy>;
}
export interface Filter {
  subprop_type: EntityType;
  subprop_key: string;
  subprop_op: Operator;
  subprop_value: Array<string>;
}
export interface GroupBy {
  ['type']: EntityType;
  value: string;
}

export interface Chart {
  id: string;
  chartType: string;
}

export interface ChartData {
  wasCached: boolean;
  transformationIds: Array<string>;
  timeComputed: number;
  novaRuntime: number;
  cacheFreshness: string;
  novaCost: number;
  novaRequestDuration: number;
  data: {};
}
