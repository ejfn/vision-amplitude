import moment from 'moment';
import React from 'react';
import {
  ColorScalePropType,
  VictoryAxis,
  VictoryTheme
} from 'victory-native';
import { Padding } from '../typings/victory';

export interface LegendProps {
  labels: Array<string>;
  colorScale?: ColorScalePropType;
  width: number;
  height: number;
  padding: Padding;
}

export class AxisX extends React.PureComponent<LegendProps> {

  private formatLabel = (date: string, totalDays: number): string => {
    if (totalDays < 30) {
      return moment(date).format('D');
    }
    if (totalDays < 90) {
      return moment(date).format('D-MMM');
    }
    return moment(date).format('MMM');
  }

  public render(): JSX.Element {
    let tickValues;
    let tickFormat;
    if (this.props.labels.length > 0) {
      const totalDays = moment(this.props.labels[this.props.labels.length - 1]).diff(moment(this.props.labels[0]), 'days');
      tickValues = this.props.labels.map((_: string, i: number) => i);
      tickFormat = this.props.labels.map((s: string) => this.formatLabel(s, totalDays));
    }
    return (
      <VictoryAxis
        theme={VictoryTheme.material}
        colorScale={this.props.colorScale}
        scale={'time'}
        width={this.props.width}
        height={this.props.height}
        padding={this.props.padding}
        standalone={false}
        tickValues={tickValues}
        tickFormat={tickFormat}
        fixLabelOverlap={true} />
    );
  }
}
