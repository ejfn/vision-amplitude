import React from 'react';
import {
  ColorScalePropType,
  VictoryAxis
} from 'victory-native';
import { BarChartDataSet } from './BarChart';
import { LineChartDataSet } from './LineChart';

export interface LegendProps {
  dataSet: LineChartDataSet | BarChartDataSet;
  colorScale?: ColorScalePropType;
}

export class AxisY extends React.PureComponent<LegendProps> {
  public render(): JSX.Element {
    return (
      <VictoryAxis
        dependentAxis
        colorScale={this.props.colorScale}
        fixLabelOverlap={true}
      />
    );
  }
}
