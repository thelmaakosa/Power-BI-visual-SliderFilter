/*
 *  Power BI Visualizations
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

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";

export class OptionSettings {
  public Between: boolean = true;
  public GreaterThan: boolean = true;
  public LessThan: boolean = true;
  public Beyond: boolean = true;
}

export class DropdownSettings {
  public DropdownFontFamily: string = 'Segoe UI';
  public DropdownFontSize: number = 10;
  public DropdownFontColor: string = '#3f464b';
}

export class SliderSettings {
  public SliderFillColor: string = '#add9c8';
  public SliderColor: string = 'none';
  public SliderBorderColor: string = '#3f464b';
  public LabelFont: string = 'Segoe UI';
  public LabelFontSize: number = 9;
  public LabelFontColor: string = '#3f464b';
  public TimeFormat: boolean = false;
  public LabelDecimalPlaces: number = 0;
}

export class VisualSettings extends dataViewObjectsParser.DataViewObjectsParser {
  public optionssettings: OptionSettings = new OptionSettings();
  public dropdownsettings: DropdownSettings = new DropdownSettings();
  public slidersettings: SliderSettings = new SliderSettings();

}


