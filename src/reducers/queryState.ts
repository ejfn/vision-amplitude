import * as actions from '../actions/queryState';
import { QueryPeriod, QueryState, ReduxIndex } from '../store';
import { INITIAL_STATE } from './initialState';

export function queryStateReducer(
  state: Record<QueryPeriod, ReduxIndex<QueryState>> = INITIAL_STATE.queryState,
  action:
    typeof actions.startQuery.shape |
    typeof actions.completeQuery.shape
): Record<QueryPeriod, ReduxIndex<QueryState>> {
  switch (action.type) {
    case actions.startQuery.type: {
      const { period, queryId } = action.payload;
      const data = state[period][queryId] || { isRequesting: false };
      return {
        ...state,
        [period]: {
          ...state[period],
          [queryId]: {
            ...data,
            isRequesting: true
          }
        }
      };
    }
    case actions.completeQuery.type: {
      const { period, queryId, error } = action.payload;
      const data = state[period][queryId] || { isRequesting: false };
      return {
        ...state,
        [period]: {
          ...state[period],
          [queryId]: {
            ...data,
            isRequesting: false,
            error
          }
        }
      };
    }
    default:
      return state;
  }
}
