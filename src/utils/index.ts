import moment from 'moment';
import { IterationOption } from '../api/types';
import { QueryPeriod } from '../store';

export function encodeQueryData(data: { [key: string]: string | number | undefined }): string {
  const ret: Array<string> = [];
  Object.keys(data).forEach((k: string) => {
    const v = data[k];
    if (v !== undefined) {
      ret.push(`${encodeURIComponent(k)}=${encodeURIComponent(v.toString())}`);
    }
  });
  return ret.join('&');
}

export function resolveRangeByPeriod(period: QueryPeriod): { start: string; end: string; i: IterationOption } {
  switch (period) {
    case '26W':
      return {
        start: moment.utc().add(-26, 'weeks').format('YYYYMMDD'),
        end: moment.utc().format('YYYYMMDD'),
        i: 7
      };
    case '13W':
      return {
        start: moment.utc().add(-13, 'weeks').format('YYYYMMDD'),
        end: moment.utc().format('YYYYMMDD'),
        i: 7
      };
    case '5W':
      return {
        start: moment.utc().add(-5, 'weeks').format('YYYYMMDD'),
        end: moment.utc().format('YYYYMMDD'),
        i: 1
      };
    case '2W':
      return {
        start: moment.utc().add(-2, 'weeks').format('YYYYMMDD'),
        end: moment.utc().format('YYYYMMDD'),
        i: 1
      };
    case '1W':
    default:
      return {
        start: moment.utc().add(-1, 'weeks').format('YYYYMMDD'),
        end: moment.utc().format('YYYYMMDD'),
        i: 1
      };
  }
}
