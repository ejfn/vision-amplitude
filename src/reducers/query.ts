import * as actions from '../actions/query';
import { Query } from '../api/types';
import { ReduxIndex } from '../store';
import { INITIAL_STATE } from './initialState';

export function queryReducer(
  state: ReduxIndex<Query> = INITIAL_STATE.queries,
  action:
    typeof actions.updateQueryList.shape |
    typeof actions.updateQuery.shape
): ReduxIndex<Query> {
  switch (action.type) {
    case actions.updateQuery.type: {
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    }
    case actions.updateQueryList.type: {
      return action.payload.reduce(
        (p: ReduxIndex<Query>, q: Query) => {
          return {
            ...p,
            [q.id]: q
          };
        },
        state);
    }
    default:
      return state;
  }
}
