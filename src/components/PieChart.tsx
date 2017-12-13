import React from 'react';
import {
  VictoryChart,
  VictoryPie,
  VictoryTheme
} from 'victory-native';
import { DataObject } from '../typings/victory';

export type PieChartDataSet = Array<DataObject>;

export interface PieChartProps {
  dataSet: PieChartDataSet;
}

export class PieChart extends React.PureComponent<PieChartProps> {
  public render(): JSX.Element {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryPie data={this.props.dataSet} />;
      </VictoryChart>
    );
  }
}
