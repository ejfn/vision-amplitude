import React from 'react';
import {
  ColorScalePropType,
  VictoryAxis
} from 'victory-native';
import { Pt } from '../typings/victory';
import { BarChartDataSet } from './BarChart';
import { LineChartDataSet } from './LineChart';

export interface LegendProps {
  dataSet: LineChartDataSet | BarChartDataSet;
}

export class AxisY extends React.PureComponent<LegendProps> {
  public render(): JSX.Element {
    const labels: Array<string> = Object.keys(this.props.dataSet || {});
    let tickValues;
    if (labels.length > 0) {
      tickValues = this.props.dataSet[labels[0]].map((_: Pt, i: number) => i);
    }
    return (
      <VictoryAxis dependentAxis
        fixLabelOverlap={true} />
    );
  }
}
