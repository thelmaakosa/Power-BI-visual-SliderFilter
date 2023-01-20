import * as React from "react";
import { ChartSettingsModel } from "./settings";
export interface State {
    defaultValue: [any, any];
    valueType: "Quantity" | "Time" | "Combination";
    max?: any;
    min?: any;
    Unit?: string;
    combinationType?: "hourMinutes" | "mins&secs" | "hours&mins&secs";
    settings: ChartSettingsModel;
    width: number;
    height: number;
    applyFilter?: any;
}
export declare const initialState: State;
export declare class ReactVisual extends React.Component<{}, State> {
    constructor(props: any);
    private static updateCallback;
    static update(newState: State): void;
    state: State;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default ReactVisual;
