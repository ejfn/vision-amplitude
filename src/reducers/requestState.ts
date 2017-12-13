import * as actions from '../actions/requestState';
import { QueryPeriod, ReduxIndex, RequestState } from '../store';
import { INITIAL_STATE } from './initialState';

export function requestStateReducer(
  state: Record<QueryPeriod, ReduxIndex<RequestState>> = INITIAL_STATE.requestState,
  action:
    typeof actions.startRequest.shape |
    typeof actions.endRequest.shape
): Record<QueryPeriod, ReduxIndex<RequestState>> {
  switch (action.type) {
    case actions.startRequest.type:
      {
        const { period, id } = action.payload;
        const data = state[period][id] || { isRequesting: false };
        return {
          ...state,
          [period]: {
            ...state[period],
            [id]: {
              ...data,
              isRequesting: true
            }
          }
        };
      }
    case actions.endRequest.type:
      {
        const { period, id, error } = action.payload;
        const data = state[period][id] || { isRequesting: false };
        return {
          ...state,
          [period]: {
            ...state[period],
            [id]: {
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
