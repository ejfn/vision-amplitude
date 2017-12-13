import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { chartsDataSaga } from './chartsData';

export function* rootSaga(): SagaIterator {
  yield fork(chartsDataSaga);
}
