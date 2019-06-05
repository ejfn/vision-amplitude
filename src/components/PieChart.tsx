import React from 'react';
import { Dimensions, View } from 'react-native';
import {
  ColorScalePropType,
  VictoryContainer,
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
    let dataSet: Array<Pt> = [{ x: '', y: 1 }];
    let sum = 1;
    let labels = (_: Pt): string => '';
    let legends: Array<{}> = [{ name: '' }];
    if (this.props.dataSet && this.props.dataSet.length > 0) {
      dataSet = this.props.dataSet;
      sum = dataSet.reduce((p: number, c: Pt) => p + c.y, 0);
      labels = (o: Pt): string => `${Math.round(o.y * 100 / sum)}%`;
      legends = dataSet.slice(0, 6)
        .map((p: Pt) => ({ name: `${p.x}: ${p.y}` }));
    }
    const innerRadius = (width * 0.6 / 2 - 20) / 2;
    const height = width * 0.6;
    const labelRadius = innerRadius * 4 / 3;
    return (
      <View>
        <VictoryContainer width={width} height={height}>
          <VictoryLegend
            theme={VictoryTheme.material}
            colorScale={this.props.colorScale}
            orientation={'vertical'}
            x={20}
            y={20}
            data={legends}
            standalone={false}
          />
          <VictoryPie
            standalone={false}
            theme={VictoryTheme.material}
            colorScale={this.props.colorScale}
            width={width}
            height={height}
            innerRadius={innerRadius}
            labelRadius={labelRadius}
            padding={{ left: width * 0.4, right: 20, top: 20, bottom: 20 }}
            padAngle={2}
            data={dataSet}
            // tslint:disable-next-line:react-this-binding-issue
            labels={labels}
          />
        </VictoryContainer>
      </View>

    );
  }
}
