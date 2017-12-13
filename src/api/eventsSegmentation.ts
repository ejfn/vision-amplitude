import { encode } from 'base-64';

import { EXTRA_CONFIG } from '../config';
import { QueryPeriod } from '../store';
import { encodeQueryData, resolveRangeByPeriod } from '../utils/index';
import {
  Chart,
  ChartData,
  EventQuery,
  MetricsOption
} from './types';

export interface EventsSegmentationChart extends Chart {
  chartType: 'EventsSegmentation';
  e: EventQuery;
  e2?: EventQuery;
  m: MetricsOption;
}

export interface EventsSegmentationChartData extends ChartData {
  data: {
    series: Array<Array<number>>;
    seriesLabels: Array<Array<number | string>>;
    seriesCollapsed: Array<{ setId: string; value: number }>;
    xValues: Array<string>;
  };
}

export function isEventsSegmentation(o: Chart | undefined): o is EventsSegmentationChart {
  return o != null && typeof o === 'object' && o.chartType === 'EventsSegmentation';
}

export async function getEventsSegmentation(
  chart: EventsSegmentationChart,
  period: QueryPeriod
): Promise<EventsSegmentationChartData> {
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

  return response.json() as Promise<EventsSegmentationChartData>;
}
