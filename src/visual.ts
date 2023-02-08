/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { dataRoleHelper } from "powerbi-visuals-utils-dataviewutils";

import * as moment from "moment";
import * as d3 from "d3";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { ChartSettingsModel } from "./settings";
import { applyFilter } from "./functions";
import { getCapability } from "./utils";
import { ReactVisual, initialState } from "./ReactVisual";

export class Visual implements IVisual {
  private target: HTMLElement;
  private formattingSettings: ChartSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private host: IVisualHost;
  private reactRoot: React.ComponentElement<any, any>;

  constructor(options: VisualConstructorOptions) {
    
    this.target = options.element;
    const localizationManager = options.host.createLocalizationManager();
    this.formattingSettingsService = new FormattingSettingsService(
      localizationManager
    );
    console.log("Visual constructor", options);
    this.host = options.host;
    this.reactRoot = React.createElement(ReactVisual, {});
    ReactDOM.render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    console.log("VisualUpdateOptions", options);
    this.formattingSettings = this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        ChartSettingsModel,
        options.dataViews
      );
    const visualHost = this.host;
    if (
      dataRoleHelper.hasRoleInDataView(options.dataViews[0], "value") &&
      dataRoleHelper.hasRoleInDataView(options.dataViews[0], "unit")
    ) {
      const unit  =options.dataViews[0].categorical.categories.filter(
        (d) => Object.keys(d.source.roles).indexOf("unit") > -1
      )[0].values[0];
      const value = options.dataViews[0].categorical.categories.filter(
        (d) => Object.keys(d.source.roles).indexOf("value") > -1
      )[0];
      const dataValues = [...new Set(value.values)];

      let minDataValue: number,
        maxDataValue: number,
        maximumDataValue: number,
        minimumDataValue: number;
      let minDateValue: number,
        maxDateValue: number,
        maximumDateValue: number,
        minimumDateValue: number;

      if (value.source.type.numeric || value.source.type.dateTime) {
        maximumDataValue = d3.max(dataValues, (d) => d as any);
        minimumDataValue = d3.min(dataValues, (d) => d as any);

        if(options.jsonFilters.length>0){
          maxDataValue = options.jsonFilters[0]["conditions"]?.filter((d) => d["operator"] == "LessThanOrEqual")[0]?.value||maximumDataValue
          minDataValue = options.jsonFilters[0]["conditions"]?.filter((d) => d["operator"] == "GreaterThanOrEqual")[0]?.value||minimumDataValue
        } else {
          maxDataValue = maximumDataValue
          minDataValue = minimumDataValue
        }

        if (value.source.type.dateTime) {
          maximumDateValue = new Date(maximumDataValue).getTime();
          minimumDateValue = new Date(minimumDataValue).getTime();
          maxDateValue = new Date(maxDataValue).getTime();
          minDateValue = new Date(minDataValue).getTime();

          console.log([minDateValue, maxDateValue])
        }
      }

      const valueType = this.formattingSettings.valueTypeUnitSettings.valueType.value.value as any;
      const combinationType = valueType=='CombinationTime'?this.formattingSettings.valueTypeUnitSettings.combinationTimeType.value.value:valueType=='CombinationLength'?this.formattingSettings.valueTypeUnitSettings.combinationLengthType.value.value:null as any
      const combinationUnit = valueType=='CombinationTime'?this.formattingSettings.valueTypeUnitSettings.combinationTimeInputValueUnit.value.value:valueType=='CombinationLength'?this.formattingSettings.valueTypeUnitSettings.combinationLengthInputValueUnit.value.value:null as any
      if (value.source.type.numeric) {
        ReactVisual.update({
          defaultValue: [minDataValue, maxDataValue],
          max: maximumDataValue,
          min: minimumDataValue,
          valueType:valueType,
          unit: unit as string,
          combinationType: combinationType,
          combinationUnit:combinationUnit,
          settings: this.formattingSettings,
          width: options.viewport.width,
          height: options.viewport.height,
          applyFilter:applyFilter(value, this.host)
        });
      } else if (value.source.type.dateTime) {
        ReactVisual.update({
          defaultValue: [minDateValue, maxDateValue],
          max: maximumDateValue,
          min: minimumDateValue,
          valueType:valueType,
          unit: unit as string,
          combinationType: combinationType,
          combinationUnit: combinationUnit,
          settings: this.formattingSettings,
          width: options.viewport.width,
          height: options.viewport.height,
          applyFilter:applyFilter(value, this.host)
        });
      }
    } else {
      ReactVisual.update({
        defaultValue: null,
        max: null,
        min: null,
        valueType:null,
        unit: null,
        combinationType: null,
        combinationUnit: null,
        settings: null,
        width: null,
        height: null,
        applyFilter:null
      });
    }

    // applyFilter({type:"between",categories:category, visualHost,minValue,maxValue})
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    this.formattingSettings.cards.filter(
      (d) => d.name == "valueTypeUnit"
    )[0].slices =
      this.formattingSettings.valueTypeUnitSettings.valueType.value.value ==
      "Quantity"
        ? this.formattingSettings.valueTypeUnitSettings.slices.filter(
            (d) =>
              d.name == "valueType" ||
              d.name == "quantityDecimal" ||
              d.name == "quantityUnit"
          )
        : this.formattingSettings.valueTypeUnitSettings.valueType.value.value ==
          "CombinationTime"
        ? this.formattingSettings.valueTypeUnitSettings.slices.filter(
            (d) => d.name == "valueType" || d.name == "combinationTimeType"|| d.name == "combinationTimeInputValueUnit"
          )
        : this.formattingSettings.valueTypeUnitSettings.valueType.value.value ==
          "CombinationLength"
        ? this.formattingSettings.valueTypeUnitSettings.slices.filter(
            (d) => d.name == "valueType" || d.name == "combinationLengthType"|| d.name == "combinationLengthInputValueUnit"
          )
        : this.formattingSettings.valueTypeUnitSettings.valueType.value.value ==
          "Time"
        ? this.formattingSettings.valueTypeUnitSettings.slices.filter(
            (d) => d.name == "valueType" || d.name == "timeFormat"
          )
        : this.formattingSettings.valueTypeUnitSettings.slices.filter(
            (d) => d.name == "valueType"
          );
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
