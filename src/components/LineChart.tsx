import { Svg } from 'expo';
import React from 'react';
import { Dimensions } from 'react-native';
import {
  ColorScalePropType,
  DomainPropType,
  VictoryGroup,
  VictoryLine,
  VictoryTheme
} from 'victory-native';
import { Pt } from '../typings/victory';
import { AxisX } from './AxisX';
import { AxisY } from './AxisY';

const { width } = Dimensions.get('window');

export type LineChartDataSet = Record<string, Array<Pt>>;

export interface LineChartProps {
  dataSet: LineChartDataSet;
  colorScale: ColorScalePropType;
}

export class LineChart extends React.PureComponent<LineChartProps> {
  public render(): JSX.Element {
    const dataSet: LineChartDataSet = this.props.dataSet || {};
    const labels: Array<string> = Object.keys(dataSet);
    let xLabels: Array<string> = [];
    const domain: DomainPropType = { y: [0, 1] };
    if (labels.length > 0) {
      xLabels = dataSet[labels[0]].map((p: Pt) => p.x);
      const maxY = labels.reduce(
        (p: number, c: string) => {
          return Math.max(p, Math.max(...dataSet[c].map((i: Pt) => i.y)));
        },
        0);
      domain.y[1] = maxY * 1.2;
    }
    const height = width * 0.7;
    const padding = { top: 20, left: 50, right: 50, bottom: 50 };
    return (
      <Svg width={width} height={height}>
        <AxisX
          width={width}
          height={height}
          padding={padding}
          labels={xLabels}
        />
        <AxisY
          width={width}
          height={height}
          padding={padding}
          domain={domain}
        />
        <VictoryGroup
          theme={VictoryTheme.material}
          colorScale={this.props.colorScale}
          domain={domain}
          width={width}
          height={height}
          padding={padding}
          scale={{ x: 'time', y: 'linear' }}
        >
          {
            labels.map((k: string) => {
              return (
                <VictoryLine
                  key={k}
                  name={k}
                  interpolation="linear"
                  data={dataSet[k]}
                />);
            })
          }
        </VictoryGroup>
      </Svg>
    );
  }
}
