import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme
} from 'victory-native';
import { DataObject } from '../typings/victory';

export type BarChartDataSet = Record<string, Array<DataObject>>;

export interface BarChartProps {
  dataSet: BarChartDataSet;
}

export class BarChart extends React.PureComponent<BarChartProps> {
  public render(): JSX.Element {
    const names: Array<string> = Object.keys(this.props.dataSet || {});
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryGroup colorScale={'qualitative'}>
          {
            names.map((k: string) => {
              return (<VictoryBar key={k} data={this.props.dataSet[k]} />);
            })
          }
        </VictoryGroup>
      </VictoryChart>
    );
  }
}
