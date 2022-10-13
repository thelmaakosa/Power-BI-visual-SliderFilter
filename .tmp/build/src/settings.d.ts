import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
export declare class OptionSettings {
    Between: boolean;
    GreaterThan: boolean;
    LessThan: boolean;
    Beyond: boolean;
}
export declare class DropdownSettings {
    DropdownFontFamily: string;
    DropdownFontSize: number;
    DropdownFontColor: string;
}
export declare class SliderSettings {
    SliderFillColor: string;
    SliderColor: string;
    SliderBorderColor: string;
    LabelFont: string;
    LabelFontSize: number;
    LabelFontColor: string;
    TimeFormat: boolean;
    LabelDecimalPlaces: number;
}
export declare class VisualSettings extends dataViewObjectsParser.DataViewObjectsParser {
    optionssettings: OptionSettings;
    dropdownsettings: DropdownSettings;
    slidersettings: SliderSettings;
}
