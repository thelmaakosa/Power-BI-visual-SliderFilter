import { FC } from "react";
import { ChartSettingsModel } from "../settings";
export interface IProps {
    defaultValue: RangeValueType;
    valueType: "Quantity" | "Time" | "Combination";
    max?: any;
    min?: any;
    Unit?: string;
    combinationType?: "hourMinutes" | "mins&secs" | "hours&mins&secs";
    settings: ChartSettingsModel;
    width: number;
    height: number;
    applyFilter: any;
}
declare type RangeValueType = [any, any];
export declare const SliderFilter: FC<IProps>;
export default SliderFilter;
