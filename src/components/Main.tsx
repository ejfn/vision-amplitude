import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';

import { invalidateChartDataList } from '../actions/chartsData';
import { Chart, ChartData } from '../api/types';
import { AppState, QueryPeriod, RequestState } from '../store';

interface OwnProps { }

interface DisplayChart {
  chart: Chart;
  chartData?: ChartData;
  requestState?: RequestState;
}

interface StateProps {
  period: QueryPeriod;
  charts: Array<DisplayChart>;
}

interface DispatchProps {
  invalidateChartDataList: typeof invalidateChartDataList;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State { }

export class InnerMain extends React.PureComponent<Props, State> {

  public componentDidMount(): void {
    this.props.invalidateChartDataList(this.props.period);
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
  const charts: Array<DisplayChart> = [];
  Object.keys(state.charts).forEach((id: string) => {
    const chart = state.charts[id];
    const chartData = state.chartsData[period][id];
    const requestState = state.requestState[period][id];
    if (chart !== undefined) {
      charts.push({
        chart,
        chartData,
        requestState
      });
    }
  });
  return {
    period,
    charts
  };
};

// tslint:disable-next-line:variable-name
export const Main = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, {
    invalidateChartDataList
  })(InnerMain);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
