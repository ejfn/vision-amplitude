import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/queryData';
import * as queryStataActions from '../actions/queryState';
import {
  EVENTS_SEGMENTATION_QUERY_TYPE,
  EventsSegmentationQueryData,
  getEventsSegmentation,
  isEventsSegmentationQuery
} from '../api/eventsSegmentation';
import { Query } from '../api/types';
import { AppState, QueryState } from '../store';

function* invalidateQueryDataSaga(action: typeof actions.invalidateQueryData.shape): SagaIterator {
  const { period, queryId } = action.payload;
  const query: Query = yield select((s: AppState) => s.queries[queryId]);
  const currentQueryState: QueryState | undefined = yield select((s: AppState) => s.queryState[period][queryId]);
  if (currentQueryState !== undefined && currentQueryState.isRequesting) {
    // skip, it's requesting...
    return;
  }
  try {
    yield put(queryStataActions.startQuery({ period, queryId }));
    if (isEventsSegmentationQuery(query)) {
      const queryData: EventsSegmentationQueryData = yield call(getEventsSegmentation, query, period);
      queryData.queryType = EVENTS_SEGMENTATION_QUERY_TYPE;
      yield put(actions.updateQueryData({
        period,
        queryId,
        queryData
      }));
      yield put(queryStataActions.completeQuery({ period, queryId }));
    } else {
      throw new Error('Invalid query definition.');
    }
  } catch (e) {
    yield put(queryStataActions.completeQuery({ period, queryId, error: e.message }));
  }
}

function* invalidateQueryDataListSaga(action: typeof actions.invalidateQueryDataList.shape): SagaIterator {
  const { period, queryIds } = action.payload;
  yield all(
    queryIds.map((queryId: string) => {
      return put(actions.invalidateQueryData({ period, queryId }));
    })
  );
}

export function* querySaga(): SagaIterator {
  yield takeEvery(actions.invalidateQueryData.type, invalidateQueryDataSaga);
  yield takeLatest(actions.invalidateQueryDataList.type, invalidateQueryDataListSaga);
}
