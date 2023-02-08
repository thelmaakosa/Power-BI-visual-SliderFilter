import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
export declare class SliderOptionsSettings extends FormattingSettingsCard {
    between: formattingSettings.ToggleSwitch;
    greaterThan: formattingSettings.ToggleSwitch;
    lessThan: formattingSettings.ToggleSwitch;
    beyond: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class DropdownSettings extends FormattingSettingsCard {
    onOff: formattingSettings.ToggleSwitch;
    fillColor: formattingSettings.ColorPicker;
    outlineColor: formattingSettings.ColorPicker;
    outlineThickness: formattingSettings.NumUpDown;
    outlineLeft: formattingSettings.ToggleSwitch;
    outlineRight: formattingSettings.ToggleSwitch;
    outlineTop: formattingSettings.ToggleSwitch;
    outlineBottom: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft: formattingSettings.NumUpDown;
    outlineRadiusTopRight: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft: formattingSettings.NumUpDown;
    outlineRadiusBottomRight: formattingSettings.NumUpDown;
    focusOutlineColor: formattingSettings.ColorPicker;
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    fontColor: formattingSettings.ColorPicker;
    fontBold: formattingSettings.ToggleSwitch;
    fontItalic: formattingSettings.ToggleSwitch;
    fontUnderline: formattingSettings.ToggleSwitch;
    chevronIconSize: formattingSettings.NumUpDown;
    chevronColor: formattingSettings.ColorPicker;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class DataLabelSettings extends FormattingSettingsCard {
    onOff: formattingSettings.ToggleSwitch;
    fillColor: formattingSettings.ColorPicker;
    fillOpacity: formattingSettings.NumUpDown;
    outlineColor: formattingSettings.ColorPicker;
    outlineThickness: formattingSettings.NumUpDown;
    outlineLeft: formattingSettings.ToggleSwitch;
    outlineRight: formattingSettings.ToggleSwitch;
    outlineTop: formattingSettings.ToggleSwitch;
    outlineBottom: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft: formattingSettings.NumUpDown;
    outlineRadiusTopRight: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft: formattingSettings.NumUpDown;
    outlineRadiusBottomRight: formattingSettings.NumUpDown;
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    fontColor: formattingSettings.ColorPicker;
    fontBold: formattingSettings.ToggleSwitch;
    fontItalic: formattingSettings.ToggleSwitch;
    fontUnderline: formattingSettings.ToggleSwitch;
    textInput: formattingSettings.ToggleSwitch;
    focusOutlineColor: formattingSettings.ColorPicker;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class SliderSettings extends FormattingSettingsCard {
    trackHeight: formattingSettings.NumUpDown;
    trackRadius: formattingSettings.NumUpDown;
    trackUnselectedFillColor: formattingSettings.ColorPicker;
    trackUnselectedFillOpacity: formattingSettings.NumUpDown;
    trackUnselectedOutlineColor: formattingSettings.ColorPicker;
    trackSelectedFillColor: formattingSettings.ColorPicker;
    trackSelectedFillOpacity: formattingSettings.NumUpDown;
    trackSelectedOutlineColor: formattingSettings.ColorPicker;
    trackOutlineThickness: formattingSettings.NumUpDown;
    knobSize: formattingSettings.NumUpDown;
    knobActiveFillColor: formattingSettings.ColorPicker;
    knobActiveFillOpacity: formattingSettings.NumUpDown;
    knobActiveOutlineColor: formattingSettings.ColorPicker;
    knobInactiveFillColor: formattingSettings.ColorPicker;
    knobInactiveFillOpacity: formattingSettings.NumUpDown;
    knobInactiveOutlineColor: formattingSettings.ColorPicker;
    knobOutilineThickness: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class ValueTypeUnitSettings extends FormattingSettingsCard {
    valueType: formattingSettings.ItemDropdown;
    quantityDecimal: formattingSettings.NumUpDown;
    quantityUnit: formattingSettings.ToggleSwitch;
    combinationTimeInputValueUnit: formattingSettings.ItemDropdown;
    combinationTimeType: formattingSettings.ItemDropdown;
    combinationLengthInputValueUnit: formattingSettings.ItemDropdown;
    combinationLengthType: formattingSettings.ItemDropdown;
    timeFormat: formattingSettings.ItemDropdown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class ChartSettingsModel extends FormattingSettingsModel {
    sliderOptionsSettings: SliderOptionsSettings;
    dropdownSettings: DropdownSettings;
    dataLabelSettings: DataLabelSettings;
    sliderSettings: SliderSettings;
    valueTypeUnitSettings: ValueTypeUnitSettings;
    cards: (DropdownSettings | SliderOptionsSettings | SliderSettings | DataLabelSettings | ValueTypeUnitSettings)[];
}
