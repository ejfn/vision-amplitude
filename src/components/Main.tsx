import React from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SegmentedControlIOS,
  StyleSheet,
  View
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { updateQueryPeriod } from '../actions/period';
import { invalidateQueryDataList, InvalidateQueryDataListPayload } from '../actions/queryData';
import { selectDisplayChartList } from '../selectors/displayChart';
import { selectQueryIds } from '../selectors/query';
import { AppState, Chart, QueryPeriod, QueryState } from '../store';
import { BarChart, BarChartDataSet } from './BarChart';
import { LineChart, LineChartDataSet } from './LineChart';
import { PieChart, PieChartDataSet } from './PieChart';

const { width } = Dimensions.get('window');

export type DataSet = LineChartDataSet | BarChartDataSet | PieChartDataSet;

const PERIODS: Array<QueryPeriod> = ['1W', '2W', '5W', '13W', '26W'];

interface OwnProps { }
export interface DisplayChart {
  chart: Chart;
  dataSet: DataSet | undefined;
  state: QueryState | undefined;
}

interface StateProps {
  period: QueryPeriod;
  charts: Array<DisplayChart>;
  queryIds: Array<string>;
  refreshing: boolean;
}

interface DispatchProps {
  invalidateQueryDataList: typeof invalidateQueryDataList;
  updateQueryPeriod: typeof updateQueryPeriod;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State { }

export class InnerMain extends React.PureComponent<Props, State> {

  public componentDidMount(): void {
    this.refresh();
  }

  public componentDidUpdate(_: Props): void {
    // todo: check invalidate
    if (this.props.charts.filter((c: DisplayChart) =>
      c.dataSet === undefined &&
      c.state === undefined).length > 0) {
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

  private renderChart = (displayChart: DisplayChart, i: number): JSX.Element => {
    const { chart, dataSet } = displayChart;
    const { chartType, colorScale } = chart;
    switch (chartType) {
      case 'Line':
        return (
          <LineChart
            key={i}
            colorScale={colorScale}
            dataSet={dataSet as LineChartDataSet}
          />
        );
      case 'Bar':
        return (
          <BarChart
            key={i}
            colorScale={colorScale}
            dataSet={dataSet as BarChartDataSet} />
        );
      case 'Pie':
        return (
          <PieChart
            key={i}
            colorScale={colorScale}
            dataSet={dataSet as PieChartDataSet} />
        );
      default:
        return <View />;
    }
  }

  private onPeriodChanged = (v: QueryPeriod): void => {
    this.props.updateQueryPeriod(v);
  }

  public render(): JSX.Element {
    const periodIndex = PERIODS.indexOf(this.props.period);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <SegmentedControlIOS
            style={styles.periods}
            values={PERIODS}
            selectedIndex={periodIndex}
            onValueChange={this.onPeriodChanged}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollview}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.refresh}
            />
          }>
          {
            this.props.charts.map((c: DisplayChart, i: number) => this.renderChart(c, i))
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => {
  const period = state.period;
  const charts: Array<DisplayChart> = selectDisplayChartList(state, period);
  const queryIds: Array<string> = selectQueryIds(state);
  const refreshing: boolean = charts.filter(
    (c: DisplayChart) => c.state === undefined || c.state.isRequesting).length > 0;
  return {
    period,
    charts,
    queryIds,
    refreshing
  };
};

// tslint:disable-next-line:variable-name
export const Main = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, {
    invalidateQueryDataList,
    updateQueryPeriod
  })(InnerMain);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  top: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  scrollview: {
    alignItems: 'center'
  },
  periods: {
    width: width * 0.8
  }
});
