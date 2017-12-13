import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';

import { invalidateQueryDataList, InvalidateQueryDataListPayload } from '../actions/queryData';
import { selectDisplayChartList } from '../selectors/displayChart';
import { selectQueryIds } from '../selectors/query';
import { AppState, Chart, QueryPeriod, QueryState } from '../store';
import { BarChart, BarChartDataSet } from './BarChart';
import { LineChart, LineChartDataSet } from './LineChart';
import { PieChart, PieChartDataSet } from './PieChart';

interface OwnProps { }

export type DataSet = LineChartDataSet | BarChartDataSet | PieChartDataSet;

export interface DisplayChart {
  chart: Chart;
  dataSet: DataSet | undefined;
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

  private renderChart = (chart: DisplayChart, i: number): JSX.Element => {
    switch (chart.chart.chartType) {
      case 'Line':
        return <LineChart key={i} dataSet={chart.dataSet as LineChartDataSet} />;
      case 'Bar':
        return <BarChart key={i} dataSet={chart.dataSet as BarChartDataSet} />;
      case 'Pie':
        return <PieChart key={i} dataSet={chart.dataSet as PieChartDataSet} />;
      default:
        return <View />;
    }

  }

  public render(): JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        {
          this.props.charts.map((c: DisplayChart, i: number) => this.renderChart(c, i))
        }
        <Text>{JSON.stringify(this.props.charts)}</Text>
      </SafeAreaView>
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
