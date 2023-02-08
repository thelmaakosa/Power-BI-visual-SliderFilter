import powerbi from "powerbi-visuals-api";
import * as React from "react";

import { SliderFilter, IProps } from "./components/SliderFilter";
// import { StyledDiv } from "./components/StyledDiv"
import { ChartSettingsModel } from "./settings";

interface IDataPoint {
  settings: ChartSettingsModel;
  width: number;
  height: number;
  minValue: number;
  maxValue: number;
  maximumValue: number;
  minimumValue: number;
}
interface IDatePoint {
  minValue: Date;
  maxValue: Date;
  maximumValue: Date;
  minimumValue: Date;
}
// export const sampleData1: IDataPoint = {
//   minValue: 61,
//   maxValue: 200,
//   maximumValue: 900,
//   minimumValue: 0,
// };
// export const sampleData2: IDatePoint = {
//   minValue: new Date(1899, 12, 31, 12, 6, 0),
//   maxValue: new Date(1899, 12, 31, 20, 45, 59),
//   maximumValue: new Date(1899, 12, 31, 0, 0, 0),
//   minimumValue: new Date(1899, 12, 31, 23, 59, 59),
// };

export interface State extends IProps{
}

export const initialState: State = {
  defaultValue: null,
  valueType:null,
  settings: null as any,
  width:0,
  height:0,

};

export class ReactVisual extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  private static updateCallback: (data: any) => void;

  public static update(newState: State) {
    if (typeof ReactVisual.updateCallback === "function") {
      ReactVisual.updateCallback(newState);
    }
  }

  public state: State = initialState;

  public componentWillMount() {
    ReactVisual.updateCallback = (newState: State): void => {
      this.setState(newState);
    };
  }

  public componentWillUnmount() {
    ReactVisual.updateCallback = () => null;
  }

  render() {        
      return (
        <>
        {this.state.settings != null?
              // <StyledDivComponent>
                <SliderFilter
                    defaultValue={[this.state.defaultValue[0], this.state.defaultValue[1]]}
                    max={this.state.max}
                    min={this.state.min}
                    valueType={this.state.valueType}
                    unit={this.state.unit}
                    combinationType={this.state.combinationType}
                    combinationUnit = {this.state.combinationUnit}
                    settings={this.state.settings}
                    width = {this.state.width}
                    height = {this.state.height}
                    applyFilter = {this.state.applyFilter}
                />
            // </StyledDivComponent>
            :<div></div>
            }
        </>
      );
    } 
    // else {
      // return <div></div>;
    // }
  // }
}

export default ReactVisual;
