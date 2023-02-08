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
    displayName: "Dropdown",
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
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
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
    displayName: "Radius Top-Left",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  outlineRadiusTopRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusTopRight",
    displayName: "Radius Top-Right",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  outlineRadiusBottomLeft = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomLeft",
    displayName: "Radius Bottom-Left",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  outlineRadiusBottomRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomRight",
    displayName: "Radius Bottom-Right",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  focusOutlineColor = new formattingSettings.ColorPicker({
    name: "focusOutlineColor",
    displayName: "Focus outline color",
    value: { value: "#00458f" },
  });

  fontFamily = new formattingSettings.FontPicker({
    name: "fontFamily",
    displayName: "Font Family",
    value: "Segoe UI",
  });

  fontSize = new formattingSettings.NumUpDown({
    name: "fontSize",
    displayName: "Font Size",
    value: 10,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
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


  chevronIconSize = new formattingSettings.NumUpDown({
    name:"chevronIconSize",
    displayName: "Chevron Icon Size",
    value:10
  })
  

  chevronColor = new formattingSettings.ColorPicker({
    name: "chevronColor",
    displayName: "Chevron Icon Color",
    value: { value: "#00458f" },
  });

  name: string = "dropdown";
  displayName: string = "Dropdown";
  slices: Array<FormattingSettingsSlice> = [
    this.onOff,
    this.fillColor,
    this.outlineRadiusTopLeft,
    this.outlineRadiusTopRight,
    this.outlineRadiusBottomLeft,
    this.outlineRadiusBottomRight,
    this.outlineLeft,
    this.outlineRight,
    this.outlineTop,
    this.outlineBottom,
    this.outlineColor,
    this.outlineThickness,
    // this.focusOutlineColor,
    this.fontFamily,
    this.fontSize,
    this.fontColor,
    this.fontBold,
    this.fontItalic,
    this.fontUnderline,
    this.chevronIconSize,
    this.chevronColor
  ];
}

export class DataLabelSettings extends FormattingSettingsCard {

  onOff = new formattingSettings.ToggleSwitch({
    name: "onOff",
    displayName: "Data Label",
    topLevelToggle: true,
    value: true,
  });

  fillColor = new formattingSettings.ColorPicker({
    name: "fillColor",
    displayName: "Fill Color",
    value: { value: "#fafafa" },
  });

  fillOpacity = new formattingSettings.NumUpDown({
    name: "fillOpacity",
    displayName: "Fill Opacity",
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

  outlineColor = new formattingSettings.ColorPicker({
    name: "outlineColor",
    displayName: "Outline Color",
    value: { value: "#3f464b" },
  });

  outlineThickness = new formattingSettings.NumUpDown({
    name: "outlineThickness",
    displayName: "Outline Thickness",
    value: 2,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
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
    displayName: "Radius Top-Left",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  outlineRadiusTopRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusTopRight",
    displayName: "Radius Top-Right",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  outlineRadiusBottomLeft = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomLeft",
    displayName: "Radius Bottom-Left",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  outlineRadiusBottomRight = new formattingSettings.NumUpDown({
    name: "outlineRadiusBottomRight",
    displayName: "Radius Bottom-Right",
    value: 0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  });

  fontFamily = new formattingSettings.FontPicker({
    name: "fontFamily",
    displayName: "Font Family",
    value: "Segoe UI",
  });

  fontSize = new formattingSettings.NumUpDown({
    name: "fontSize",
    displayName: "Font Size",
    value: 9,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
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
    this.fillOpacity,
    this.outlineRadiusTopLeft,
    this.outlineRadiusTopRight,
    this.outlineRadiusBottomLeft,
    this.outlineRadiusBottomRight,
    this.outlineLeft,
    this.outlineRight,
    this.outlineTop,
    this.outlineBottom,
    this.outlineColor,
    this.outlineThickness,
    this.fontFamily,
    this.fontSize,
    this.fontColor,
    this.fontBold,
    this.fontItalic,
    this.fontUnderline,
    this.textInput,
    // this.focusOutlineColor
  ];
}

export class SliderSettings extends FormattingSettingsCard {

  trackHeight = new formattingSettings.NumUpDown({
    name:"trackHeight",
    displayName:"Track Height",
    value:20
  })

  trackRadius = new formattingSettings.NumUpDown({
    name:"trackRadius",
    displayName:"Track Radius",
    value:15
  })

  trackUnselectedFillColor = new formattingSettings.ColorPicker({
    name: "trackUnselectedFillColor",
    displayName: "Track Unselected Fill Color",
    value: { value: "#d9dadb" },
  });

  trackUnselectedFillOpacity = new formattingSettings.NumUpDown({
    name: "trackUnselectedFillOpacity",
    displayName: "Track Unselected Fill Opacity",
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
    value: { value: "" },
  });

  trackSelectedFillColor = new formattingSettings.ColorPicker({
    name: "trackSelectedFillColor",
    displayName: "Track Selected Fill Color",
    value: { value: "#00458f" },
  });

  trackSelectedFillOpacity = new formattingSettings.NumUpDown({
    name: "trackSelectedFillOpacity",
    displayName: "Track Selected Fill Opacity",
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
    value: { value: "" },
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
    options: {
      minValue: {
        type: ValidatorType.Min,
        value: 0,
      },
    },
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

  knobOutilineThickness = new formattingSettings.NumUpDown({
    name:"knobOutilineThickness",
    displayName:"Knob Outline Thickness",
    value:1
  })

  name: string = "slider";
  displayName: string = "Slider";
  slices: Array<FormattingSettingsSlice> = [
    this.trackHeight,
    this.trackRadius,
    this.trackSelectedFillColor,
    this.trackSelectedFillOpacity,
    this.trackUnselectedFillColor,
    this.trackUnselectedFillOpacity,
    this.trackSelectedOutlineColor,
    this.trackUnselectedOutlineColor,
    this.trackOutlineThickness,
    this.knobSize,
    this.knobActiveFillColor,
    this.knobActiveFillOpacity,
    this.knobInactiveFillColor,
    this.knobInactiveFillOpacity,
    this.knobActiveOutlineColor,
    this.knobInactiveOutlineColor,
    this.knobOutilineThickness
  ];
}

export class ValueTypeUnitSettings extends FormattingSettingsCard {

  valueType = new formattingSettings.ItemDropdown({
    name: "valueType",
    displayName: "Value Type",
    items: [
      { value: "Quantity", displayName: "Quantity" },
      { value: "CombinationTime", displayName: "Combination(Time)" },
      { value: "CombinationLength", displayName: "Combination(Length)" },
      { value: "Time", displayName: "Time" },
    ],
    value: { value: "Quantity", displayName: "Quantity" },
  });

  quantityDecimal = new formattingSettings.NumUpDown({
    name:"quantityDecimal",
    displayName:"Quantity - Number of Decimals",
    value:0,
    options:{
      "minValue":{
        "type":ValidatorType.Min,
        "value":0
      },
    }
  })

  quantityUnit = new formattingSettings.ToggleSwitch({
    name: "quantityUnit",
    displayName: "Quantity - Unit",
    value: true,
    
  });

  combinationTimeInputValueUnit = new formattingSettings.ItemDropdown({
    name:"combinationTimeInputValueUnit",
    displayName:"Combination(Time) - Input Value Unit",
    items:[
      {value:"h", displayName:"Hours"},
      {value:"s", displayName:"Seconds"},
      {value:"m", displayName:"Minutes"},
    ],
    value:{value:"m", displayName:"Minutes"},
  })

  combinationTimeType = new formattingSettings.ItemDropdown({
    name: "combinationTimeType",
    displayName: "Combination(Time) - Displayed Unit",
    items: [
      { value: "hourMinutes", displayName: "hour & minutes" },
      { value: "hourMinutesSeconds", displayName: "hour & minutes & seconds" },
    ],
    value: { value: "hourMinutes", displayName: "hour & minutes" },
  });

  combinationLengthInputValueUnit = new formattingSettings.ItemDropdown({
    name:"combinationLengthInputValueUnit",
    displayName:"Combination(Length) - Input Value Unit",
    items:[
      {value:"feet", displayName:"Feet"},
      {value:"inches", displayName:"Inches"},
    ],
    value:{value:"feet", displayName:"Feet"},
  })

  combinationLengthType = new formattingSettings.ItemDropdown({
    name: "combinationLengthType",
    displayName: "Combination(Length) - Displayed Unit",
    items: [
      { value: "feetInches", displayName: "Feet & Inches" },
    ],
    value: { value: "feetInches", displayName: "Feet & Inches" },
  });

  timeFormat = new formattingSettings.ItemDropdown({
    name: "timeFormat",
    displayName: "Time - Format",
    items: [
      { value: "%I:%M %p", displayName: "hh:mm AM/PM" },
      { value: "%-I:%M %p", displayName: "h:mm AM/PM" },
      { value: "%H:%M", displayName: "hh:mm" },
      { value: "%-H:%M", displayName: "h:mm" },
    ],
    value: { value: "%I:%M %p", displayName: " hh:mm AM/PM" },
  });

  name: string = "valueTypeUnit";
  displayName: string = "Value Type & Units";
  slices: Array<FormattingSettingsSlice> = [
    this.valueType,
    this.quantityDecimal,
    this.quantityUnit,
    this.combinationTimeInputValueUnit,
    this.combinationTimeType,
    this.combinationLengthInputValueUnit,
    this.combinationLengthType,
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

  cards = [this.dropdownSettings,this.sliderOptionsSettings,this.sliderSettings, this.dataLabelSettings,  this.valueTypeUnitSettings,];
}

