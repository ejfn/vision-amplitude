import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';

import { invalidateQueryDataList, InvalidateQueryDataListPayload } from '../actions/queryData';
import { QueryData } from '../api/types';
import { selectDisplayChartList } from '../selectors/displayChart';
import { selectQueryIds } from '../selectors/query';
import { AppState, Chart, QueryPeriod, QueryState } from '../store';

interface OwnProps { }

export interface DisplayChart {
  chart: Chart;
  chartData: QueryData | undefined;
  state: QueryState | undefined;
}

interface StateProps {
  period: QueryPeriod;
  charts: Array<DisplayChart>;
  queryIds: Array<string>;
}

interface DispatchProps {
  invalidateQueryDataList: typeof invalidateQueryDataList;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State { }

export class InnerMain extends React.PureComponent<Props, State> {

  public componentDidMount(): void {
    this.refresh();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.queryIds !== this.props.queryIds) {
      this.refresh();
    }
  }

  private refresh = (): void => {
    const payload: InvalidateQueryDataListPayload = {
      period: this.props.period,
      queryIds: this.props.queryIds
    };
    this.props.invalidateQueryDataList(payload);
  }

  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.charts)}</Text>
      </View>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => {
  const period = state.period;
  const charts: Array<DisplayChart> = selectDisplayChartList(state, period);
  const queryIds: Array<string> = selectQueryIds(state);
  return {
    period,
    charts,
    queryIds
  };
};

// tslint:disable-next-line:variable-name
export const Main = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, {
    invalidateQueryDataList
  })(InnerMain);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
