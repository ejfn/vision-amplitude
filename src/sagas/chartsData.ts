import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/chartsData';
import * as requestStateActions from '../actions/requestState';
import { getEventsSegmentation, isEventsSegmentation } from '../api/eventsSegmentation';
import { Chart } from '../api/types';
import { AppState, ReduxIndex } from '../store';

function* invalidateChartDataSaga(action: typeof actions.invalidateChartData.shape): SagaIterator {
  const { period, chart } = action.payload;
  const id = chart.id;
  yield put(requestStateActions.startRequest({ period, id }));
  try {
    if (isEventsSegmentation(chart)) {
      const chartData = yield call(getEventsSegmentation, chart, period);
      yield put(actions.updateChartData({
        period,
        id,
        chartData
      }));
      yield put(requestStateActions.endRequest({ period, id }));
    }
  } catch (e) {
    yield put(requestStateActions.endRequest({ period, id, error: e.message }));
  }
}

function* invalidateChartDataListSaga(action: typeof actions.invalidateChartDataList.shape): SagaIterator {
  const period = action.payload;
  const charts: ReduxIndex<Chart> = yield select((s: AppState) => s.charts);

  yield all(
    Object.keys(charts)
      .map((k: string) => {
        // tslint:disable-next-line:no-non-null-assertion
        const chart = charts[k]!;
        return put(actions.invalidateChartData({ chart, period }));
      })
  );
}

export function* chartsDataSaga(): SagaIterator {
  yield takeEvery(actions.invalidateChartData.type, invalidateChartDataSaga);
  yield takeLatest(actions.invalidateChartDataList.type, invalidateChartDataListSaga);
}
