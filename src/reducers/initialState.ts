import { AppState } from '../store';

export const INITIAL_STATE: AppState = {
  period: '1W',
  charts: [],
  queries: {},
  queryData: {
    '1W': {},
    '2W': {},
    '5W': {},
    '13W': {},
    '26W': {}
  },
  queryState: {
    '1W': {},
    '2W': {},
    '5W': {},
    '13W': {},
    '26W': {}
  }
};
