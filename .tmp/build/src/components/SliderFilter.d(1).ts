import { FC } from "react";
import { ChartSettingsModel } from "../settings";
export interface IProps {
    defaultValue: RangeValueType;
    valueType: "Quantity" | "Time" | "CombinationTime" | "CombinationLength";
    max?: any;
    min?: any;
    unit?: string;
    combinationType?: "hourMinutes" | "feetInches" | "hourMinutesSeconds";
    combinationUnit?: TimeUnitType | LengthUnitType;
    settings: ChartSettingsModel;
    width: number;
    height: number;
    applyFilter?: any;
}
declare type RangeValueType = [any, any];
declare type TimeUnitType = "h" | "m" | "s";
declare type LengthUnitType = "feet" | "inches";
export declare const SliderFilter: FC<IProps>;
export default SliderFilter;
