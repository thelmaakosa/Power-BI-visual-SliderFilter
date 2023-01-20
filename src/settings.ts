import powerbi from "powerbi-visuals-api";
import { dataViewWildcard } from "powerbi-visuals-utils-dataviewutils";
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
// import { BarChartDataPoint } from "./barChart";

import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import ValidatorType = powerbi.visuals.ValidatorType;


export class SliderOptionsSettings extends FormattingSettingsCard {

  between = new formattingSettings.ToggleSwitch({
    name: "between",
    displayName: "Between",
    value: true,
  });

  greaterThan = new formattingSettings.ToggleSwitch({
    name: "greaterThan",
    displayName: "Greater than",
    value: true,
  });

  lessThan = new formattingSettings.ToggleSwitch({
    name: "lessThan",
    displayName: "Less than",
    value: true,
  });

  beyond = new formattingSettings.ToggleSwitch({
    name: "beyond",
    displayName: "Beyond",
    value: true,
  });


  name: string = "sliderOptions";
  displayName: string = "Slider Options";
  slices: Array<FormattingSettingsSlice> = [
    this.between,
    this.greaterThan,
    this.lessThan,
    this.beyond,
  ];
}

export class DropdownSettings extends FormattingSettingsCard {
  onOff = new formattingSettings.ToggleSwitch({
    name: "onOff",
    displayName: "On/Off",
    topLevelToggle: true,
    value: true,
  });

  fillColor = new formattingSettings.ColorPicker({
    name: "fillColor",
    displayName: "Fill Color",
    value: { value: "#FFFFFF" },
  });

  outlineColor = new formattingSettings.ColorPicker({
    name: "outlineColor",
    displayName: "Outline Color",
    value: { value: "#3f464b" },
  });

  outlineThickness = new formattingSettings.NumUpDown({
    name: "outlineThickness",
    displayName: "Outline Thickness",
    value: 2,
  });

  outlineLeft = new formattingSettings.ToggleSwitch({
    name: "outlineLeft",
    displayName: "Outline Left",
    value: false,
  });

  outlineRight = new formattingSettings.ToggleSwitch({
    name: "outlineRight",
    displayName: "Outline Right",
    value: false,
  });

  outlineTop = new formattingSettings.ToggleSwitch({
    name: "outlineTop",
    displayName: "Outline Top",
    value: false,
  });

  outlineBottom = new formattingSettings.ToggleSwitch({
    name: "outlineBottom",
    displayName: "Outline Bottom",
    value: true,
  });

  outlineRadiusTopLeft = new formattingSettings.NumUpDown({
    name: "outlineRadiusTopLeft",
    displayName: "Outline Radius Top Left",
    value: 0,
  });

  outlineRadiusTopRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusTopRight",
    displayName: "Outline Radius Top Right",
    value: 0,
  });

  outlineRadiusBottomLeft = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomLeft",
    displayName: "Outline Radius Bottom Left",
    value: 0,
  });

  outlineRadiusBottomRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomRight",
    displayName: "Outline Radius Bottom Right",
    value: 0,
  });

  focusOutlineColor = new formattingSettings.ColorPicker({
    name: "focusOutlineColor",
    displayName: "Focus outline color",
    value: { value: "#00458f" },
  });

  fontFamily = new formattingSettings.FontPicker({
    name: "fontFamily",
    displayName: "Font Family",
    value: "Segoe UI Bold",
  });

  fontSize = new formattingSettings.NumUpDown({
    name: "fontSize",
    displayName: "Font Size",
    value: 10,
  });

  fontColor = new formattingSettings.ColorPicker({
    name: "fontColor",
    displayName: "Font Color",
    value: { value: "#000000" },
  });

  fontBold = new formattingSettings.ToggleSwitch({
    name: "fontBold",
    displayName: "Font Bold",
    value: false,
  });

  fontItalic = new formattingSettings.ToggleSwitch({
    name: "fontItalic",
    displayName: "Font Italic",
    value: false,
  });

  fontUnderline = new formattingSettings.ToggleSwitch({
    name: "fontUnderline",
    displayName: "Font Underline",
    value: false,
  });

  chevronColor = new formattingSettings.ColorPicker({
    name: "chevronColor",
    displayName: "Chevron color",
    value: { value: "#00458f" },
  });

  name: string = "dropdown";
  displayName: string = "Dropdown";
  slices: Array<FormattingSettingsSlice> = [
    this.onOff,
    this.fillColor,
    this.outlineColor,
    this.outlineThickness,
    this.outlineLeft,
    this.outlineRight,
    this.outlineTop,
    this.outlineBottom,
    this.outlineRadiusTopLeft,
    this.outlineRadiusTopRight,
    this.outlineRadiusBottomLeft,
    this.outlineRadiusBottomRight,
    this.focusOutlineColor,
    this.fontFamily,
    this.fontSize,
    this.fontColor,
    this.fontBold,
    this.fontItalic,
    this.fontUnderline,
    this.chevronColor
  ];
}

export class DataLabelSettings extends FormattingSettingsCard {

  onOff = new formattingSettings.ToggleSwitch({
    name: "onOff",
    displayName: "On/Off",
    topLevelToggle: true,
    value: true,
  });

  fillColor = new formattingSettings.ColorPicker({
    name: "fillColor",
    displayName: "Fill Color",
    value: { value: "#fafafa" },
  });

  outlineColor = new formattingSettings.ColorPicker({
    name: "outlineColor",
    displayName: "Outline Color",
    value: { value: "#3f464b" },
  });

  outlineThickness = new formattingSettings.NumUpDown({
    name: "outlineThickness",
    displayName: "Outline Thickness",
    value: 2,
  });

  outlineLeft = new formattingSettings.ToggleSwitch({
    name: "outlineLeft",
    displayName: "Outline Left",
    value: false,
  });

  outlineRight = new formattingSettings.ToggleSwitch({
    name: "outlineRight",
    displayName: "Outline Right",
    value: false,
  });

  outlineTop = new formattingSettings.ToggleSwitch({
    name: "outlineTop",
    displayName: "Outline Top",
    value: false,
  });

  outlineBottom = new formattingSettings.ToggleSwitch({
    name: "outlineBottom",
    displayName: "Outline Bottom",
    value: true,
  });

  outlineRadiusTopLeft = new formattingSettings.NumUpDown({
    name: "outlineRadiusTopLeft",
    displayName: "Outline Radius Top Left",
    value: 0,
  });

  outlineRadiusTopRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusTopRight",
    displayName: "Outline Radius Top Right",
    value: 0,
  });

  outlineRadiusBottomLeft = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomLeft",
    displayName: "Outline Radius Bottom Left",
    value: 0,
  });

  outlineRadiusBottomRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomRight",
    displayName: "Outline Radius Bottom Right",
    value: 0,
  });

  fontFamily = new formattingSettings.FontPicker({
    name: "fontFamily",
    displayName: "Font Family",
    value: "Segoe UI Bold",
  });

  fontSize = new formattingSettings.NumUpDown({
    name: "fontSize",
    displayName: "Font Size",
    value: 9,
  });

  fontColor = new formattingSettings.ColorPicker({
    name: "fontColor",
    displayName: "Font Color",
    value: { value: "#000000" },
  });

  fontBold = new formattingSettings.ToggleSwitch({
    name: "fontBold",
    displayName: "Font Bold",
    value: false,
  });

  fontItalic = new formattingSettings.ToggleSwitch({
    name: "fontItalic",
    displayName: "Font Italic",
    value: false,
  });

  fontUnderline = new formattingSettings.ToggleSwitch({
    name: "fontUnderline",
    displayName: "Font Underline",
    value: false,
  });

  textInput = new formattingSettings.ToggleSwitch({
    name: "textInput",
    displayName: "Text input",
    value: true,
  });

  focusOutlineColor = new formattingSettings.ColorPicker({
    name: "focusOutlineColor",
    displayName: "Focus outline color",
    value: { value: "#00458f" },
  });

  name: string = "dataLabel";
  displayName: string = "Data Label";
  slices: Array<FormattingSettingsSlice> = [
    this.onOff,
    this.fillColor,
    this.outlineColor,
    this.outlineThickness,
    this.outlineLeft,
    this.outlineRight,
    this.outlineTop,
    this.outlineBottom,
    this.outlineRadiusTopLeft,
    this.outlineRadiusTopRight,
    this.outlineRadiusBottomLeft,
    this.outlineRadiusBottomRight,
    this.fontFamily,
    this.fontSize,
    this.fontColor,
    this.fontBold,
    this.fontItalic,
    this.fontUnderline,
    this.textInput,
    this.focusOutlineColor
  ];
}

export class SliderSettings extends FormattingSettingsCard {

  trackHeight = new formattingSettings.NumUpDown({
    name:"trackHeight",
    displayName:"Track radius",
    value:20
  })

  trackRadius = new formattingSettings.NumUpDown({
    name:"trackRadius",
    displayName:"Track radius",
    value:15
  })

  trackUnselectedFillColor = new formattingSettings.ColorPicker({
    name: "trackUnselectedFillColor",
    displayName: "Track Unselected Fill Color",
    value: { value: "#d9dadb" },
  });

  trackUnselectedFillOpacity = new formattingSettings.NumUpDown({
    name: "trackUnselectedFillOpacity",
    displayName: "Unselected Fill Opacity",
    value: 100,
    options: {
      unitSymbol: "%",
      minValue: {
        type: ValidatorType.Min,
        value: 0,
      },
      maxValue: {
        type: ValidatorType.Max,
        value: 100,
      },
    },
  });

  trackUnselectedOutlineColor = new formattingSettings.ColorPicker({
    name: "trackUnselectedOutlineColor",
    displayName: "Track Unselected Outline Color",
    value: { value: "#ffffff" },
  });

  trackSelectedFillColor = new formattingSettings.ColorPicker({
    name: "trackSelectedFillColor",
    displayName: "Track Selected Fill Color",
    value: { value: "#00458f" },
  });

  trackSelectedFillOpacity = new formattingSettings.NumUpDown({
    name: "trackSelectedFillOpacity",
    displayName: "Selected Fill Opacity",
    value: 100,
    options: {
      unitSymbol: "%",
      minValue: {
        type: ValidatorType.Min,
        value: 0,
      },
      maxValue: {
        type: ValidatorType.Max,
        value: 100,
      },
    },
  });

  trackSelectedOutlineColor = new formattingSettings.ColorPicker({
    name: "trackSelectedOutlineColor",
    displayName: "Track Selected Outline Color",
    value: { value: "#ffffff" },
  });

  trackOutlineThickness = new formattingSettings.NumUpDown({
    name: "trackOutlineThickness",
    displayName: "Track Outline Thickness",
    value: 1,
  });

  knobSize = new formattingSettings.NumUpDown({
    name: "knobSize",
    displayName: "Knob size",
    value: 20,
  });

  knobActiveFillColor = new formattingSettings.ColorPicker({
    name: "knobActiveFillColor",
    displayName: "Knob Active Fill Color",
    value: { value: "#00458f" },
  });

  knobActiveFillOpacity = new formattingSettings.NumUpDown({
    name: "knobActiveFillOpacity",
    displayName: "Knob Active Fill Opacity",
    value: 100,
    options: {
      unitSymbol: "%",
      minValue: {
        type: ValidatorType.Min,
        value: 0,
      },
      maxValue: {
        type: ValidatorType.Max,
        value: 100,
      },
    },
  });

  knobActiveOutlineColor = new formattingSettings.ColorPicker({
    name: "knobActiveOutlineColor",
    displayName: "Knob Active Outline Color",
    value: { value: "#00458f" },
  });

  knobInactiveFillColor = new formattingSettings.ColorPicker({
    name: "knobInactiveFillColor",
    displayName: "Knob Inactive Fill Color",
    value: { value: "#8c9093" },
  });

  knobInactiveFillOpacity = new formattingSettings.NumUpDown({
    name: "knobInactiveFillOpacity",
    displayName: "Knob Inactive Fill Opacity",
    value: 100,
    options: {
      unitSymbol: "%",
      minValue: {
        type: ValidatorType.Min,
        value: 0,
      },
      maxValue: {
        type: ValidatorType.Max,
        value: 100,
      },
    },
  });

  knobInactiveOutlineColor = new formattingSettings.ColorPicker({
    name: "knobInactiveOutlineColor",
    displayName: "Knob Inactive Outline Color",
    value: { value: "#8c9093" },
  });

  name: string = "slider";
  displayName: string = "Slider";
  slices: Array<FormattingSettingsSlice> = [
    this.trackHeight,
    this.trackRadius,
    this.trackSelectedFillColor,
    this.trackSelectedFillOpacity,
    this.trackSelectedOutlineColor,
    this.trackUnselectedFillColor,
    this.trackUnselectedFillOpacity,
    this.trackUnselectedOutlineColor,
    this.trackOutlineThickness,
    this.knobSize,
    this.knobActiveFillColor,
    this.knobActiveFillOpacity,
    this.knobActiveOutlineColor,
    this.knobInactiveFillColor,
    this.knobInactiveFillOpacity,
    this.knobInactiveOutlineColor,
  ];
}

export class ValueTypeUnitSettings extends FormattingSettingsCard {

  valueType = new formattingSettings.ItemDropdown({
    name: "valueType",
    displayName: "Value Type",
    items: [
      { value: "Quantity", displayName: "Quantity" },
      { value: "Combination", displayName: "Combination" },
      { value: "Time", displayName: "Time" },
    ],
    value: { value: "Quantity", displayName: "Quantity" },
  });

  quantityDecimal = new formattingSettings.NumUpDown({
    name:"quantityDecimal",
    displayName:"Number of decimals",
    value:0
  })

  quantityUnit = new formattingSettings.ToggleSwitch({
    name: "quantityUnit",
    displayName: "Unit",
    value: true,
  });

  combinationType = new formattingSettings.ItemDropdown({
    name: "combinationType",
    displayName: "Value Type",
    items: [
      { value: "hourMinutes", displayName: "hour & minutes" },
      { value: "hourMinutesSeconds", displayName: "hour & minutes & seconds" },
    ],
    value: { value: "hourMinutes", displayName: "hour & minutes" },
  });

  timeFormat = new formattingSettings.ItemDropdown({
    name: "timeFormat",
    displayName: "Time Format",
    items: [
      { value: "%I:%M %p", displayName: " hh:mm AM/PM" },
    ],
    value: { value: "%I:%M %p", displayName: " hh:mm AM/PM" },
  });

  name: string = "valueTypeUnit";
  displayName: string = "Value Type & Units";
  slices: Array<FormattingSettingsSlice> = [
    this.valueType,
    this.quantityDecimal,
    this.quantityUnit,
    this.combinationType,
    this.timeFormat,
  ];
}



export class ChartSettingsModel extends FormattingSettingsModel {
  // Create formatting settings model formatting cards
  sliderOptionsSettings = new SliderOptionsSettings();
  dropdownSettings = new DropdownSettings();
  dataLabelSettings = new DataLabelSettings();
  sliderSettings = new SliderSettings();
  valueTypeUnitSettings = new ValueTypeUnitSettings();

  cards = [this.sliderOptionsSettings, this.dropdownSettings, this.dataLabelSettings, this.sliderSettings, this.valueTypeUnitSettings,];
}

