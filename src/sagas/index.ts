import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { querySaga } from './query';

export function* rootSaga(): SagaIterator {
  yield fork(querySaga);
}
