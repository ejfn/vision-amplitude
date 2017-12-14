import React from 'react';
import {
  ColorScalePropType,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryTheme
} from 'victory-native';

import { Pt } from '../typings/victory';
import { Legend } from './Legend';

export type LineChartDataSet = Record<string, Array<Pt>>;

export interface LineChartProps {
  dataSet: LineChartDataSet;
  colorScale: ColorScalePropType;
}

export class LineChart extends React.PureComponent<LineChartProps> {

  public render(): JSX.Element {
    const dataSet: LineChartDataSet = this.props.dataSet || {};
    const labels: Array<string> = Object.keys(dataSet);
    return (
      <VictoryChart theme={VictoryTheme.material}>
        {
          labels.length > 0 &&
          <Legend
            colorScale={this.props.colorScale}
            labels={labels}
          />
        }
        <VictoryGroup colorScale={this.props.colorScale} >
          {
            labels.map((k: string) => {
              return (
                <VictoryLine
                  key={k}
                  name={k}
                  interpolation="natural"
                  data={dataSet[k]}
                />);
            })
          }
        </VictoryGroup>
      </VictoryChart>
    );
  }
}
