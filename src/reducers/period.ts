import * as actions from '../actions/period';
import { QueryPeriod } from '../store';
import { INITIAL_STATE } from './initialState';

export function periodReducer(
  state: QueryPeriod = INITIAL_STATE.period,
  action:
    typeof actions.updateQueryPeriod.shape
): QueryPeriod {
  switch (action.type) {
    case actions.updateQueryPeriod.type:
      return action.payload;
    default:
      return state;
  }
}
