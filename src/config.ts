import { Constants } from 'expo';

import {
  EventsSegmentationQuery
} from './api/eventsSegmentation';
import { Query } from './api/types';
import { Chart } from './store';
import { ExtraConfig } from './typings/extraConfig';
import extraConfigSchema from './typings/extraConfig.schema.json';
import { schemaValidate } from './utils';

schemaValidate(extraConfigSchema, Constants.manifest.extra, true);

export const EXTRA_CONFIG = Constants.manifest.extra as ExtraConfig;

// todo: move this to app.json or elsewhere
const query1: EventsSegmentationQuery = {
  id: '9be69109-4602-46fb-9b63-4814740fb5dc',
  queryType: 'EventsSegmentation',
  e: {
    event_type: 'ce:Api Succeeded',
    group_by: [
      {
        type: 'event',
        value: 'apiType'
      }
    ]
  },
  m: 'totals'
};

const query2: EventsSegmentationQuery = {
  id: 'd65b1ca4-3be9-46fb-ba69-8858ea8f13bc',
  queryType: 'EventsSegmentation',
  e: {
    event_type: 'ce:Api Succeeded',
    group_by: [
      {
        type: 'user',
        value: 'country'
      }
    ]
  },
  m: 'totals'
};

const query3: EventsSegmentationQuery = {
  id: 'f1c8da06-c6a7-4b59-9ce8-c691df079156',
  queryType: 'EventsSegmentation',
  e: {
    event_type: 'ce:Api Failed',
    group_by: [
      {
        type: 'event',
        value: 'apiType'
      }, {
        type: 'event',
        value: 'azureLocation'
      }
    ]
  },
  m: 'totals'
};

const chart1: Chart = {
  title: 'By Type',
  queryId: query1.id,
  chartType: 'Line',
  colorScale: 'heatmap'
};

const chart2: Chart = {
  title: 'By Type',
  queryId: query1.id,
  chartType: 'Pie',
  colorScale: 'heatmap'
};

const chart3: Chart = {
  title: 'By Country',
  queryId: query2.id,
  chartType: 'Line',
  colorScale: 'heatmap'
};

const chart4: Chart = {
  title: 'By Country',
  queryId: query2.id,
  chartType: 'Pie',
  colorScale: 'heatmap'
};

const chart5: Chart = {
  title: 'By Error',
  queryId: query3.id,
  chartType: 'Line',
  colorScale: 'red'
};

const chart6: Chart = {
  title: 'By Error',
  queryId: query3.id,
  chartType: 'Pie',
  colorScale: 'red'
};

export const QUERY_DEFINITIONS: Array<Query> = [
  query1,
  query2,
  query3
];
export const CHART_DEFINITIONS: Array<Chart> = [
  chart1,
  chart2,
  chart3,
  chart4,
  chart5,
  chart6
];
