import * as actions from '../actions/queryData';
import { QueryData } from '../api/types';
import { QueryPeriod, ReduxIndex } from '../store';
import { INITIAL_STATE } from './initialState';

export function queryDataReducer(
  state: Record<QueryPeriod, ReduxIndex<QueryData>> = INITIAL_STATE.queryData,
  action:
    typeof actions.updateQueryData.shape
): Record<QueryPeriod, ReduxIndex<QueryData>> {
  switch (action.type) {
    case actions.updateQueryData.type:
      {
        const { period, queryId, queryData } = action.payload;
        const periodData = {
          ...state[period],
          [queryId]: queryData
        };
        return {
          ...state,
          [period]: periodData
        };
      }
    default:
      return state;
  }
}
