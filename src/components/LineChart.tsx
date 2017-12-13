import React from 'react';
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryTheme
} from 'victory-native';
import { DataObject } from '../typings/victory';

export type LineChartDataSet = Record<string, Array<DataObject>>;

export interface LineChartProps {
  dataSet: LineChartDataSet;
}

export class LineChart extends React.PureComponent<LineChartProps> {

  public render(): JSX.Element {
    const labels: Array<string> = Object.keys(this.props.dataSet || {});
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryGroup colorScale={'qualitative'}>
          {
            labels.map((k: string) => {
              return (
                <VictoryLine
                  key={k}
                  name={k}
                  data={this.props.dataSet[k]}
                />);
            })
          }
        </VictoryGroup>
      </VictoryChart>
    );
  }
}
