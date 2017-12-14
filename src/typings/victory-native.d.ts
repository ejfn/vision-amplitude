/// <reference types="victory"/>

declare module "victory-native" {

  import * as victory from "victory";
  export * from 'victory';

  export interface VictoryLegendProps extends victory.VictoryLegendProps {
    title?: string;
    centerTitle?: boolean;
    colorScale?: ColorScalePropType;
  }
  export class VictoryLegend extends React.Component<VictoryLegendProps, any> { }

}
