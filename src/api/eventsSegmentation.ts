import { encode } from 'base-64';

import { EXTRA_CONFIG } from '../config';
import { QueryPeriod } from '../store';
import { encodeQueryData, resolveRangeByPeriod } from '../utils/index';
import {
  EventQuery,
  MetricsOption,
  Query,
  QueryData
} from './types';

export const EVENTS_SEGMENTATION_QUERY_TYPE: string = 'EventsSegmentation';

export interface EventsSegmentationQuery extends Query {
  e: EventQuery;
  e2?: EventQuery;
  m: MetricsOption;
}

export interface EventsSegmentationQueryData extends QueryData {
  data: {
    series: Array<Array<number>>;
    seriesLabels: Array<Array<number | string>>;
    seriesCollapsed: Array<{ setId: string; value: number }>;
    xValues: Array<string>;
  };
}

export function isEventsSegmentationQuery(o: Query | undefined): o is EventsSegmentationQuery {
  return o != null && typeof o === 'object' && o.queryType === EVENTS_SEGMENTATION_QUERY_TYPE;
}

export function isEventsSegmentationQueryData(o: QueryData | undefined): o is EventsSegmentationQueryData {
  return o != null && typeof o === 'object' && o.queryType === EVENTS_SEGMENTATION_QUERY_TYPE;
}

export async function getEventsSegmentation(
  chart: EventsSegmentationQuery,
  period: QueryPeriod
): Promise<EventsSegmentationQueryData> {
  const url: string = 'https://amplitude.com/api/2/events/segmentation';
  const { start, end, i } = resolveRangeByPeriod(period);
  const query: string = encodeQueryData({
    e: JSON.stringify(chart.e, null, ''),
    e2: chart.e2 !== undefined ? JSON.stringify(chart.e2, null, '') : undefined,
    m: chart.m,
    start,
    end,
    i
  });
  const headers: Headers = new Headers();
  const basicAuth = encode(`${EXTRA_CONFIG.amplitudeApiKey}:${EXTRA_CONFIG.amplitudeApiSecret}`);
  headers.append('Authorization', `Basic ${basicAuth}`);

  const req: Request = new Request(
    `${url}?${query}`,
    {
      method: 'GET',
      headers
    }
  );

  const response: Response = await fetch(req);
  if (!response.ok) {
    throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
  }

  return response.json() as Promise<EventsSegmentationQueryData>;
}
