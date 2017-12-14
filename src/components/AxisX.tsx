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

export class AxisX extends React.PureComponent<LegendProps> {
  public render(): JSX.Element {
    const labels: Array<string> = Object.keys(this.props.dataSet || {});
    let tickValues;
    let tickFormat;
    if (labels.length > 0) {
      tickFormat = this.props.dataSet[labels[0]].map((p: Pt) => p.x);
      tickValues = this.props.dataSet[labels[0]].map((_: Pt, i: number) => i);
    }
    return (
      <VictoryAxis
        offsetY={300}
        tickValues={tickValues}
        tickFormat={tickFormat}
        fixLabelOverlap={true} />
    );
  }
}
