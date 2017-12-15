import React from 'react';
import {
  ColorScalePropType,
  VictoryLegend
} from 'victory-native';

export interface LegendProps {
  colorScale: ColorScalePropType;
  labels: Array<string>;
}

export class Legend extends React.PureComponent<LegendProps> {
  public render(): JSX.Element {
    let legends;
    if (this.props.labels.length > 0) {
      legends = this.props.labels.map((i: string) => ({ name: i })).slice(0, 3);
    }
    return (
      <VictoryLegend
        colorScale={this.props.colorScale}
        orientation={'horizontal'}
        standalone={false}
        x={80}
        y={10}
        data={legends}
      />
    );
  }
}
