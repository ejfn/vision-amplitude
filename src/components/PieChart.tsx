import { Svg } from 'expo';
import React from 'react';
import { Dimensions, View } from 'react-native';
import {
  ColorScalePropType,
  VictoryLegend,
  VictoryPie,
  VictoryTheme
} from 'victory-native';
import { Pt } from '../typings/victory';

const { width } = Dimensions.get('window');

export type PieChartDataSet = Array<Pt>;

export interface PieChartProps {
  dataSet: PieChartDataSet;
  colorScale: ColorScalePropType;
}

export class PieChart extends React.PureComponent<PieChartProps> {

  public render(): JSX.Element {
    const dataSet: Array<Pt> = this.props.dataSet;
    if (dataSet === undefined) {
      return <View />;
    }
    const sum = dataSet.reduce((p: number, c: Pt) => p + c.y, 0);
    const labels = (o: Pt): string => `${Math.round(100 * o.y / sum)}%`;
    const legends = dataSet.slice(0, 6).map((p: Pt) => ({ name: `${p.x}: ${p.y}` }));
    const innerRadius = (width * 0.6 / 2 - 20) / 2;
    return (
      <Svg>
        {dataSet &&
          <VictoryLegend
            theme={VictoryTheme.material}
            colorScale={this.props.colorScale}
            orientation={'vertical'}
            x={20}
            y={20}
            data={legends}
            standalone={false}
          />
        }
        <VictoryPie
          theme={VictoryTheme.material}
          colorScale={this.props.colorScale}
          width={width}
          height={width * 0.6}
          innerRadius={innerRadius}
          labelRadius={innerRadius * 4 / 3}
          padding={{ left: width * 0.4, right: 20, top: 20, bottom: 20 }}
          padAngle={2}
          data={dataSet}
          // tslint:disable-next-line:react-this-binding-issue
          labels={labels}
        />
      </Svg>
    );
  }
}
