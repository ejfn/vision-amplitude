import { Constants } from 'expo';

import { EventsSegmentationChart } from './api/eventsSegmentation';
import { Chart } from './api/types';
import { ExtraConfig } from './typings/extraConfig';
import extraConfigSchema from './typings/extraConfig.schema.json';
import { schemaValidate } from './utils';

schemaValidate(extraConfigSchema, Constants.manifest.extra, true);

export const EXTRA_CONFIG = Constants.manifest.extra as ExtraConfig;

// todo: move this to app.json or elsewhere
const chart1: EventsSegmentationChart = {
  id: '9be69109-4602-46fb-9b63-4814740fb5dc',
  chartType: 'EventsSegmentation',
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

export const CHARTS_DEFINITION: Array<Chart> = [chart1];
