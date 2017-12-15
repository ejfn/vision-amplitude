import React from 'react';
import {
  ColorScalePropType,
  DomainPropType,
  VictoryAxis,
  VictoryTheme
} from 'victory-native';
import { Padding } from '../typings/victory';

export interface LegendProps {
  domain: DomainPropType;
  colorScale?: ColorScalePropType;
  width: number;
  height: number;
  padding: Padding;
}

export class AxisY extends React.PureComponent<LegendProps> {
  public render(): JSX.Element {
    return (
      <VictoryAxis
        dependentAxis={true}
        theme={VictoryTheme.material}
        colorScale={this.props.colorScale}
        scale={'linear'}
        domain={this.props.domain}
        fixLabelOverlap={true}
        width={this.props.width}
        height={this.props.height}
        padding={this.props.padding}
        standalone={false}
      />
    );
  }
}
