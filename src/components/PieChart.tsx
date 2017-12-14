import React from 'react';
import {
  ColorScalePropType,
  VictoryPie,
  VictoryTheme
} from 'victory-native';
import { Pt } from '../typings/victory';

export type PieChartDataSet = Array<Pt>;

export interface PieChartProps {
  colorScale: ColorScalePropType;
  dataSet: PieChartDataSet;
}

export class PieChart extends React.PureComponent<PieChartProps> {

  public render(): JSX.Element {
    const dataSet: Array<Pt> = this.props.dataSet || [{ x: '', y: 1 }];
    const sum = dataSet.reduce((p: number, c: Pt) => p + c.y, 0);
    const labels = (o: Pt): string => `${o.x} ${Math.round(100 * o.y / sum)}%`;
    return (
      <VictoryPie
        theme={VictoryTheme.material}
        colorScale={this.props.colorScale}
        data={dataSet}
        // tslint:disable-next-line:react-this-binding-issue
        labels={labels}
      />
    );
  }
}
