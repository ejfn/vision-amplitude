import React from 'react';
import {
  ColorScalePropType,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme
} from 'victory-native';
import { Pt } from '../typings/victory';
import { Legend } from './Legend';

export type BarChartDataSet = Record<string, Array<Pt>>;

export interface BarChartProps {
  colorScale: ColorScalePropType;
  dataSet: BarChartDataSet;
}

export class BarChart extends React.PureComponent<BarChartProps> {
  public render(): JSX.Element {
    const labels: Array<string> = Object.keys(this.props.dataSet || {});
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <Legend
          colorScale={this.props.colorScale}
          labels={labels}
        />
        <VictoryStack colorScale={this.props.colorScale}>
          {
            labels.map((k: string) => {
              return (
                <VictoryBar
                  width={30}
                  key={k}
                  name={k}
                  data={this.props.dataSet[k]} />
              );
            })
          }
        </VictoryStack>
      </VictoryChart>
    );
  }
}
