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

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import { textMeasurementService } from "powerbi-visuals-utils-formattingutils";
import { pixelConverter } from "powerbi-visuals-utils-typeutils";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import FilterAction = powerbi.FilterAction;
import * as d3 from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;
import { VisualSettings } from "./settings";
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import { event } from "d3";
import { getValue } from "powerbi-visuals-utils-dataviewutils/lib/dataViewObject";
import { extractFilterColumnTarget } from "powerbi-visuals-utils-interactivityutils/lib/interactivityFilterService";
import { IBasicFilter, BasicFilter, IAdvancedFilter, IFilterColumnTarget, AdvancedFilterConditionOperators, AdvancedFilter, AdvancedFilterLogicalOperators } from "powerbi-models";
import { DateTimeSequence } from "powerbi-visuals-utils-formattingutils/lib/src/date/dateTimeSequence";

interface IAdvancedFilterCondition {
    value: number;
    operator: AdvancedFilterConditionOperators;
}

export class Visual implements powerbi.extensibility.visual.IVisual {

    // Visual Information
    private VisualSettings: VisualSettings
    private DataView: DataView
    private VisualHost: powerbi.extensibility.visual.IVisualHost;
    private svg: Selection<SVGElement>;
    private DataValues

    private VisualWidth: number = 220;
    private VisualHeight: number
    private LeftMargin = 5
    private RightMargin = 5
    private TopMargin = 5


    // Drop Down Components
    private DropDownSelectionContainer: Selection<SVGElement>;
    private SelectedFieldBackground: Selection<SVGElement>;
    private SelectedFieldText: Selection<SVGElement>;
    private ArrowText: Selection<SVGElement>;
    private DropDownSelectionClick: Selection<SVGElement>;

    private DropDownListContainer: Selection<SVGElement>;
    private DropDownBoxBackground: Selection<SVGElement>;
    private ListofOptions: Selection<SVGElement>;


    // Drop Down Properties
    private DropDownWidth: number;
    private DropDownBoxHeight = 25;

    private DropDownSelectionTextX: number;
    private DropDownSelectionTextY: number;

    private Arrow = String.fromCharCode(10216);
    private ArrowDownX: number;
    private ArrowDownY: number;
    private ArrowUpX: number;
    private ArrowUpY: number;

    private DropDownBoxBackgroundX: number;
    private DropDownBoxBackgroundY: number;

    private DropDownOptionHeight: number = 20;
    private DropDownBoxBackgroundHeight: number = 120;

    private DropDownOptionTextX: number;
    private DropDownOptionCircleX: number;

    private DropDownOptionOuterCircleR: number = 12 / 2;
    private DropDownOptionInnerCircleR: number = 8 / 2;

    // Drop Down Format
    private DropDownFont: string;
    private DropDownSelectedFontSize: number;
    private DropDownOptionsFontSize: number;
    private DropDownFontColor: string;

    // Drop Down Variables
    private SelectedOption = { DropDownLabel: "Between", DropDownValue: 1 };

    // Slider Components
    private SliderContainer: Selection<SVGElement>;
    private Slider: Selection<SVGElement>;
    private SliderMinTrack: Selection<SVGElement>;
    private SliderMaxTrack: Selection<SVGElement>;
    private KnobMin: Selection<SVGElement>;
    private KnobMax: Selection<SVGElement>;
    private KnobMinValueBox: Selection<SVGElement>;
    private KnobMaxValueBox: Selection<SVGElement>;
    private KnobMinValueText: Selection<SVGElement>;
    private KnobMaxValueText: Selection<SVGElement>;
    private KnobMinValueInput: HTMLInputElement;
    private KnobMaxValueInput: HTMLInputElement;

    // Slider Properties
    private SliderWidth: number
    private SliderHeight: number = 8;

    private LeftSliderMargin: number = 0;
    private RightSliderMargin: number = 0;

    private SliderX: number;
    private SliderY: number;
    private SliderRx: number = 5;
    private SliderRy: number = 5;

    private KnobR: number = 9;
    private KnobMinCx: number;
    private KnobMinCy: number;

    private KnobMaxCx: number;
    private KnobMaxCy: number;

    private TrackMinX: number;
    private TrackMinWidth: number;

    private TrackMaxX: number;
    private TrackMaxWidth: number;

    private KnobValueTextBoxWidth: number = 55;
    private KnobValueTextBoxHeight: number = 20;
    private KnobValueTextBoxRx: number = 5;
    private KnobValueTextBoxRy: number = 5;

    private KnobMinTextBoxX: number;
    private KnobMinTextBoxY: number;

    private KnobMinTextX: number;
    private KnobMinTextY: number;

    private KnobMaxTextBoxX: number;
    private KnobMaxTextBoxY: number;

    private KnobMaxTextX: number;
    private KnobMaxTextY: number;

    // Slider Format 
    private SliderFont: string;
    private SliderFontSize: number;
    private SliderFontColor: string;

    private SliderBorderWeight: number = 0.5;
    private SliderBorderColor: string;
    private SliderColor: string;
    private SliderFillColor: string;
    private SliderLabelDecimalPlaces: number;

    // Slider Variables
    public UserMinSelectedValue: number;
    public UserMaxSelectedValue: number;

    public KnobMinValue: number;
    public KnobMaxValue: number;
    public KnobMinText: string;
    public KnobMaxText: string;

    public SliderMinValue: number;
    public SliderMaxValue: number;



    constructor(options: VisualConstructorOptions) {

        this.svg = d3.select(options.element).append('svg')
            .classed('slider', true);

        this.VisualHost = options.host;

        // Drop Down Components
        this.DropDownSelectionContainer = this.svg.append('g')
            .classed('DropDownContainer', true);
        this.SelectedFieldBackground = this.DropDownSelectionContainer.append('rect')
            .classed('SelectedFieldBackground', true);
        this.SelectedFieldText = this.DropDownSelectionContainer.append('text')
            .classed('SelectedFieldText', true);
        this.ArrowText = this.DropDownSelectionContainer.append('text')
            .classed('ArrowText', true);
        this.DropDownSelectionClick = this.DropDownSelectionContainer.append('rect')
            .classed('DropDownSelectionClick', true);

        // Slider Compnents
        this.SliderContainer = this.svg.append('g')
            .classed('SliderContainer', true);
        this.Slider = this.SliderContainer.append('rect')
            .classed('Slider', true);
        this.SliderMinTrack = this.SliderContainer.append('rect')
            .classed('SliderMinTrack', true);
        this.SliderMaxTrack = this.SliderContainer.append('rect')
            .classed('SliderMaxTrack', true);
        this.KnobMin = this.SliderContainer.append('circle')
            .classed('KnobMin', true);
        this.KnobMax = this.SliderContainer.append('circle')
            .classed('KnobMax', true);
        this.KnobMinValueBox = this.SliderContainer.append('rect')
            .classed('KnobMinValueBox', true);

        this.KnobMinValueText = this.SliderContainer.append('text')
            .classed('KnobMinValueText', true);
        //this.KnobMinValueInput = document.createElement('input')
        this.KnobMaxValueBox = this.SliderContainer.append('rect')
            .classed('KnobMaxValueBox', true);
        this.KnobMaxValueText = this.SliderContainer.append('text')
            .classed('KnobMaxValueText', true);
        //this.KnobMaxValueInput = document.createElement('input')
        this.DropDownListContainer = this.svg.append('g')
            .classed('DropDownListContainer', true);
        this.DropDownBoxBackground = this.DropDownListContainer.append('rect')
            .classed('DropDownBoxBackground', true);
        this.ListofOptions = this.DropDownListContainer.append('g')
            .classed('ListofOptions', true);

    }

    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {

        const settings: VisualSettings = this.VisualSettings || <VisualSettings>VisualSettings.getDefault();

        return VisualSettings.enumerateObjectInstances(settings, options);
    }

    public update(options: VisualUpdateOptions) {

        // Get Updated Data
        this.DataView = options.dataViews[0];
        this.DataValues = this.DataView.categorical.categories[0].values;

        // Get Updated Visual Settings
        this.VisualSettings = VisualSettings.parse<VisualSettings>(this.DataView);

        // Get Visual Size
        this.VisualWidth = options.viewport.width;
        this.VisualHeight = options.viewport.height;

        // Setup Visual based on Update Visual Size
        this.svg
            .attr("width", this.VisualWidth)
            .attr("height", this.VisualHeight)

        // Determine Min and Max Data
        let MinDataValue: number = Math.min.apply(Math, this.DataValues);
        let MaxDataValue: number = Math.max.apply(Math, this.DataValues);

        if (this.DataValues.length === 0) {

            MinDataValue = 0;
            MaxDataValue = 0;

        }

        this.UpdateInterface(MinDataValue, MaxDataValue)

    }

    public UpdateInterface(MinDataValue: number, MaxDataValue: number) {

        // Drop Down Dimensions
        this.DropDownWidth = this.VisualWidth - this.LeftMargin - this.RightMargin;

        this.DropDownSelectionTextX = this.LeftMargin + 5;
        this.DropDownSelectionTextY = this.DropDownBoxHeight - 2;

        this.ArrowDownX = this.DropDownWidth + this.LeftMargin - 1;
        this.ArrowDownY = this.DropDownSelectionTextY + 1
        this.ArrowUpX = this.ArrowDownX - 10
        this.ArrowUpY = this.ArrowDownY - 12

        // Drop Down Format
        this.DropDownFont = this.VisualSettings.dropdownsettings.DropdownFontFamily;
        this.DropDownSelectedFontSize = pixelConverter.fromPointToPixel(this.VisualSettings.dropdownsettings.DropdownFontSize);
        this.DropDownOptionsFontSize = pixelConverter.fromPointToPixel(this.VisualSettings.dropdownsettings.DropdownFontSize - 1);
        this.DropDownFontColor = this.VisualSettings.dropdownsettings.DropdownFontColor;

        // Slider Dimensions
        this.SliderWidth = this.DropDownWidth - (this.LeftSliderMargin + this.RightSliderMargin) - 2 * this.SliderBorderWeight
        this.SliderY = this.TopMargin + this.DropDownBoxHeight + this.KnobR + this.SliderBorderWeight;
        this.SliderX = this.LeftMargin + this.LeftSliderMargin + this.SliderBorderWeight;

        this.KnobMinCx = this.SliderX + this.KnobR;
        this.KnobMinCy = this.SliderY + this.KnobR / 2;

        this.KnobMaxCx = this.SliderX + this.SliderWidth - this.KnobR;
        this.KnobMaxCy = this.SliderY + this.KnobR / 2;

        this.TrackMinX = this.SliderX;
        this.TrackMinWidth = this.SliderWidth;

        this.TrackMaxX = this.SliderX;
        this.TrackMaxWidth = this.SliderWidth;

        this.KnobMinTextBoxX = this.LeftMargin;
        this.KnobMinTextBoxY = this.SliderY + this.SliderHeight + 10

        this.KnobMinTextX = this.KnobMinTextBoxX + this.KnobValueTextBoxWidth / 2;
        this.KnobMinTextY = this.KnobMinTextBoxY + this.KnobValueTextBoxHeight - 5

        this.KnobMaxTextBoxX = this.LeftMargin + this.DropDownWidth - this.KnobValueTextBoxWidth
        this.KnobMaxTextBoxY = this.SliderY + this.SliderHeight + 10

        this.KnobMaxTextX = this.KnobMaxTextBoxX + this.KnobValueTextBoxWidth / 2;
        this.KnobMaxTextY = this.KnobMaxTextBoxY + this.KnobValueTextBoxHeight - 5

        // Slider Format
        this.SliderColor = this.VisualSettings.slidersettings.SliderColor;
        this.SliderFillColor = this.VisualSettings.slidersettings.SliderFillColor;
        this.SliderBorderColor = this.VisualSettings.slidersettings.SliderBorderColor;

        this.SliderFont = this.VisualSettings.slidersettings.LabelFont;
        this.SliderFontSize = pixelConverter.fromPointToPixel(this.VisualSettings.slidersettings.LabelFontSize);
        this.SliderFontColor = this.VisualSettings.slidersettings.LabelFontColor;
        this.SliderLabelDecimalPlaces = this.VisualSettings.slidersettings.LabelDecimalPlaces;

        this.UpdateDropDownOptions()

        // Determine Slider Max and Min Values
        this.SliderMinValue = MinDataValue;
        this.SliderMaxValue = MaxDataValue;

        this.DropDownSelectionContainer.attr("visibility", "visible");

        // Drop Down Box Background
        this.SelectedFieldBackground
            .attr("x", this.LeftMargin)
            .attr("y", this.TopMargin)
            .attr("width", this.DropDownWidth)
            .attr("height", this.DropDownBoxHeight)
            .style("fill", 'white')
            .style("fill-opacity", 1);

        // Drop Down Selected Field Text
        this.SelectedFieldText
            .text(this.SelectedOption.DropDownLabel)
            .attr("x", this.DropDownSelectionTextX)
            .attr("y", this.DropDownSelectionTextY)
            .attr("text-anchor", "start")
            .style("font-family", this.DropDownFont)
            .style("font-size", this.DropDownSelectedFontSize)
            .style("fill", this.DropDownFontColor)

        // Drop Down Arrow Text
        this.ArrowText
            .text(this.Arrow)
            .attr("x", this.ArrowDownX)
            .attr("y", this.ArrowDownY)
            .attr("rotate", -90)
            .attr("text-anchor", "end")
            .attr("textLength", 6)
            .attr("lengthAdjust", "spacingAndGlyphs")
            .style("font-size", pixelConverter.fromPointToPixel(22))
            .style("font-family", this.DropDownFont)
            .style("fill", this.DropDownFontColor);

        // Drop Down Selection Area
        this.DropDownSelectionClick
            .attr("x", this.LeftMargin)
            .attr("y", this.TopMargin)
            .attr("width", this.DropDownWidth)
            .attr("height", this.DropDownBoxHeight)
            .style("fill", 'white')
            .style("fill-opacity", 0)
            .on("click", () => {

                if (this.DropDownListContainer.attr("visibility") === "visible") {

                    this.ArrowText
                        .attr("rotate", -90)
                        .attr("x", this.ArrowDownX)
                        .attr("y", this.ArrowDownY);
                    this.DropDownListContainer.attr("visibility", "hidden")
                    this.ListofOptions.attr("visibility", "hidden")

                }

                else {

                    this.ArrowText
                        .attr("rotate", 90)
                        .attr("x", this.ArrowUpX)
                        .attr("y", this.ArrowUpY);
                    this.DropDownListContainer.attr("visibility", "visible")
                    this.ListofOptions.attr("visibility", "visible")

                }

            })

        // Slider Background
        this.Slider
            .attr("x", this.SliderX)
            .attr("y", this.SliderY)
            .attr("height", this.SliderHeight)
            .attr("width", this.SliderWidth)
            .style("fill", this.SliderColor)
            .style("stroke", this.SliderBorderColor)
            .style("stroke-width", this.SliderBorderWeight)
            .style("rx", this.SliderRx)
            .style("ry", this.SliderRy)

        // Slider Minimum Knob
        this.KnobMin
            .attr("cy", this.KnobMinCy)
            .attr("cx", this.KnobMinCx)
            .attr("r", this.KnobR)
            .style("fill", this.SliderFillColor)
            .style("stroke", this.SliderBorderColor)
            .style("stroke-width", this.SliderBorderWeight)
            .call(d3.drag().on("drag", () => {

                if (this.SelectedOption.DropDownLabel === "Between" || this.SelectedOption.DropDownLabel === "Beyond") {

                    if (d3.event.x < (this.SliderX + this.KnobR)) {

                        this.KnobMinCx = (this.SliderX + this.KnobR)
                        this.UpdatedMinKnobText()

                    }

                    else if (d3.event.x > (this.SliderX + this.SliderWidth - this.KnobR)) {

                        this.KnobMinCx = (this.SliderX + this.SliderWidth - this.KnobR)
                        this.UpdatedMinKnobText()

                    }

                    else if (d3.event.x > this.KnobMaxCx) {

                        this.KnobMinCx = event.x
                        this.KnobMaxCx = event.x
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()


                    }

                    else {

                        this.KnobMinCx = event.x
                        this.UpdatedMinKnobText()

                    }

                }

                else if (this.SelectedOption.DropDownLabel === "Greater Than" || this.SelectedOption.DropDownLabel === "Less Than") {

                    if (d3.event.x < (this.SliderX + this.KnobR)) {

                        this.KnobMinCx = (this.SliderX + this.KnobR)
                        this.KnobMaxCx = (this.SliderX + this.KnobR)
                        this.UpdatedMinKnobText();
                        this.UpdatedMaxKnobText();

                    }

                    else if (d3.event.x > (this.SliderX + this.SliderWidth - this.KnobR)) {

                        this.KnobMinCx = (this.SliderX + this.SliderWidth - this.KnobR)
                        this.KnobMaxCx = (this.SliderX + this.SliderWidth - this.KnobR)
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()

                    }

                    else if (d3.event.x > this.KnobMaxCx) {

                        this.KnobMinCx = event.x
                        this.KnobMaxCx = event.x
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()


                    }

                    else {

                        this.KnobMinCx = event.x
                        this.KnobMaxCx = event.x
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()

                    }

                }

                this.KnobMin.attr("cx", this.KnobMinCx)
                this.KnobMax.attr("cx", this.KnobMaxCx)

                this.DetermineTrackLocation();
                this.SliderLabelLocation();

            })
                .on("end", () => {

                    this.ClearFilter()
                    this.CreateFilter();

                }));



        // Slider Maximum Knob 
        this.KnobMax
            .attr("cy", this.KnobMaxCy)
            .attr("cx", this.KnobMaxCx)
            .attr("r", this.KnobR)
            .style("fill", this.SliderFillColor)
            .style("stroke", this.SliderBorderColor)
            .style("stroke-width", this.SliderBorderWeight)
            .call(d3.drag().on("drag", () => {

                if (this.SelectedOption.DropDownLabel === "Between" || this.SelectedOption.DropDownLabel === "Beyond") {

                    if (d3.event.x < (this.SliderX + this.KnobR)) {

                        this.KnobMaxCx = (this.SliderX + this.KnobR)

                        this.UpdatedMaxKnobText()

                    }

                    else if (d3.event.x > (this.SliderX + this.SliderWidth - this.KnobR)) {

                        this.KnobMaxCx = (this.SliderX + this.SliderWidth - this.KnobR)
                        this.UpdatedMaxKnobText()

                    }

                    else if (d3.event.x < this.KnobMinCx) {

                        this.KnobMinCx = event.x
                        this.KnobMaxCx = event.x
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()

                    }

                    else {

                        this.KnobMaxCx = event.x
                        this.UpdatedMaxKnobText()

                    }
                }

                else if (this.SelectedOption.DropDownLabel === "Greater Than" || this.SelectedOption.DropDownLabel === "Less Than") {

                    if (d3.event.x < (this.SliderX + this.KnobR)) {

                        this.KnobMinCx = (this.SliderX + this.KnobR)
                        this.KnobMaxCx = (this.SliderX + this.KnobR)
                        this.UpdatedMinKnobText();
                        this.UpdatedMaxKnobText();

                    }

                    else if (d3.event.x > (this.SliderX + this.SliderWidth - this.KnobR)) {

                        this.KnobMinCx = (this.SliderX + this.SliderWidth - this.KnobR)
                        this.KnobMaxCx = (this.SliderX + this.SliderWidth - this.KnobR)
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()

                    }

                    else if (d3.event.x > this.KnobMaxCx) {

                        this.KnobMinCx = event.x
                        this.KnobMaxCx = event.x
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()


                    }

                    else {

                        this.KnobMinCx = event.x
                        this.KnobMaxCx = event.x
                        this.UpdatedMinKnobText()
                        this.UpdatedMaxKnobText()


                    }


                }

                this.KnobMin.attr("cx", this.KnobMinCx)
                this.KnobMax.attr("cx", this.KnobMaxCx)

                this.DetermineTrackLocation();
                this.SliderLabelLocation();

            })
                .on("end", () => {

                    this.ClearFilter()
                    this.CreateFilter();

                }));

        // Slider Min Track to Show Selected Values
        this.SliderMinTrack
            .attr("x", this.TrackMinX)
            .attr("y", this.SliderY)
            .attr("height", this.SliderHeight)
            .attr("width", this.TrackMinWidth)
            .style("fill", this.SliderFillColor)
            .style("fill-opacity", 1)
            .style("stroke", this.SliderFillColor)
            .style("stroke-width", 0)
            .style("rx", this.SliderRx)
            .style("ry", this.SliderRy);

        // Slider Max Track to Show Selected Values
        this.SliderMaxTrack
            .attr("x", this.TrackMaxX)
            .attr("y", this.SliderY)
            .attr("height", this.SliderHeight)
            .attr("width", this.TrackMaxWidth)
            .style("fill", this.SliderFillColor)
            .style("fill-opacity", 1)
            .style("stroke", this.SliderFillColor)
            .style("stroke-width", 0)
            .style("rx", this.SliderRx)
            .style("ry", this.SliderRy)

        // Box for Minimum Value Selected
        this.KnobMinValueBox
            .attr("x", this.KnobMinTextBoxX)
            .attr("y", this.KnobMinTextBoxY)
            .attr("height", this.KnobValueTextBoxHeight)
            .attr("width", this.KnobValueTextBoxWidth)
            .attr("contentEditable", true)
            .style("fill", "white")
            .style("fill-opacity", 1)
            .attr("rx", this.KnobValueTextBoxRx)
            .attr("ry", this.KnobValueTextBoxRy);

        // Box for Maximum Value Selected
        this.KnobMaxValueBox
            .attr("x", this.KnobMaxTextBoxX)
            .attr("y", this.KnobMaxTextBoxY)
            .attr("height", this.KnobValueTextBoxHeight)
            .attr("width", this.KnobValueTextBoxWidth)
            .style("fill", "white")
            .style("fill-opacity", 1)
            .attr("rx", this.KnobValueTextBoxRx)
            .attr("ry", this.KnobValueTextBoxRy);

        // Minimum Value Text
        this.KnobMinValueText
            .text(this.KnobMinText)
            .attr("x", this.KnobMinTextX)
            .attr("y", this.KnobMinTextY)
            .attr("text-anchor", "middle")
            .style("font-family", this.SliderFont)
            .style("font-size", this.SliderFontSize)
            .style("fill", this.SliderFontColor);

        // Maximum Value Text
        this.KnobMaxValueText
            .text(this.KnobMaxText)
            .attr("x", this.KnobMaxTextX)
            .attr("y", this.KnobMaxTextY)
            .attr("text-anchor", "middle")
            .style("font-family", this.SliderFont)
            .style("font-size", this.SliderFontSize)
            .style("fill", this.SliderFontColor);

        this.DetermineKnobLocation()
        this.DetermineTrackLocation()

    }

    // Determine and Update Dropdown Options
    public UpdateDropDownOptions() {

        let DropDownOptions = this.GetDropDownOptions();

        this.DropDownBoxBackgroundY = this.TopMargin + this.DropDownBoxHeight + 3 / 2;
        this.DropDownBoxBackgroundX = this.LeftMargin

        this.DropDownOptionTextX = this.LeftMargin + 30;
        this.DropDownOptionCircleX = this.LeftMargin + 15;

        let DropDownOptionHeight = this.DropDownOptionHeight;
        let DropDownBoxBackgroundY = this.DropDownBoxBackgroundY

        let DropDownOptionsFontSize = this.DropDownOptionsFontSize
        let DropDownFontColor = this.DropDownFontColor

        if (DropDownOptions.length === 0) {
            this.SelectedOption = { DropDownLabel: "", DropDownValue: 0 };
        }

        else {

            let testarray = [];

            for (let i = 0; i <= DropDownOptions.length - 1;) {
                testarray[i] = DropDownOptions[i].DropDownValue
                i++
            }

            if (testarray.indexOf(this.SelectedOption.DropDownValue) >= 0) {
                this.SelectedOption = this.SelectedOption
            }

            else {
                this.SelectedOption = DropDownOptions[0];
            }

        }

        let SelectedOptionValue = this.SelectedOption.DropDownValue

        this.SelectedFieldText.text(this.SelectedOption.DropDownLabel)

        // Drop Down Option Container 
        this.DropDownListContainer
            .attr("visibility", "hidden")

        // Drop Down Option Box Background
        var DropDownBoxBackground = this.DropDownBoxBackground
            .attr("x", this.DropDownBoxBackgroundX)
            .attr("y", this.DropDownBoxBackgroundY)
            .attr("width", this.DropDownWidth)
            .attr("height", this.DropDownBoxBackgroundHeight)
            .attr("fill", "white");

        // Drop Down List of Options Container 
        var ListofOptions = this.ListofOptions
            .attr("visibility", "hidden")

        // Remove Previous Options from List
        ListofOptions.selectAll("*").remove();


        // Drop Down List Options Group
        var DropDownOption = ListofOptions
            .selectAll("g")
            .data(DropDownOptions)
            .enter()
            .append("g")
            .on("click", (d) => {

                d3.event.stopPropagation();

                this.SelectedOption = d;

                this.SelectedFieldText.text(d.DropDownLabel);

                d3.selectAll(".DropDownOptionInnerCircle")
                    .style("fill", "none");

                d3.select(d3.event.target.parentNode)
                    .select(".DropDownOptionInnerCircle")
                    .style("fill", this.DropDownFontColor);

                this.ArrowText
                    .attr("rotate", -90)
                    .attr("x", this.ArrowDownX)
                    .attr("y", this.ArrowDownY);

                this.DropDownListContainer.attr("visibility", "hidden");
                this.ListofOptions.attr("visibility", "hidden");

                this.DetermineKnobLocation();
                this.DetermineTrackLocation();
                this.ClearFilter();
                this.CreateFilter();
            }


            );

        // Drop Down List Options Text
        DropDownOption
            .append("text")
            .attr("x", this.DropDownOptionTextX)
            .classed("DropDownOptionText", true)
            .attr("y", function (d, i) {
                return (
                    (i * DropDownOptionHeight) + DropDownBoxBackgroundY +
                    DropDownOptionHeight / 2 +
                    DropDownOptionsFontSize / 3
                );
            })
            .text(function (d) {
                return d.DropDownLabel;
            })
            .attr("font-size", this.DropDownOptionsFontSize)
            .attr("fill", this.DropDownFontColor);

        // Drop Down List Options Mouse Area
        DropDownOption
            .append("rect")
            .attr("width", this.DropDownWidth)
            .attr("height", DropDownOptionHeight)
            .classed("DropDownOptionBox", true)
            .attr("y", function (d, i) {
                return i * DropDownOptionHeight + (DropDownBoxBackgroundY);
            })
            .style("fill", "transparent")
            .on("mouseover", (d) => {
                d3.event.stopPropagation();

                let color = "none"

                if (d.DropDownValue === this.SelectedOption.DropDownValue) {

                    color = "#8c9093"
                }

                d3.select(d3.event.target.parentNode)
                    .select(".DropDownOptionInnerCircle")
                    .style("stroke", "#8c9093")
                    .style("fill", color);

                d3.select(d3.event.target.parentNode)
                    .select(".DropDownOptionOuterCircle")
                    .style("stroke", "#8c9093");

                d3.select(d3.event.target.parentNode)
                    .select("text")
                    .style("fill", "#8c9093");
            })

            .on("mouseout", (d) => {

                d3.event.stopPropagation();

                let color = "none"

                if (d.DropDownValue === this.SelectedOption.DropDownValue) {

                    color = this.DropDownFontColor
                }

                d3.select(d3.event.target.parentNode)
                    .select(".DropDownOptionInnerCircle")
                    .style("stroke", this.DropDownFontColor)
                    .style("fill", color);

                d3.select(d3.event.target.parentNode)
                    .select(".DropDownOptionOuterCircle")
                    .style("stroke", this.DropDownFontColor);


                d3.select(d3.event.target.parentNode)
                    .select("text")
                    .style("fill", this.DropDownFontColor);
            });


        // Drop Down List Options Outer Circle for Radio Button 
        DropDownOption
            .append("circle")
            .attr("cx", this.DropDownOptionCircleX)
            .classed("DropDownOptionOuterCircle", true)
            .attr("cy", function (d, i) {
                return i * DropDownOptionHeight + (DropDownBoxBackgroundY + DropDownOptionHeight / 2);
            })
            .attr("r", this.DropDownOptionOuterCircleR)
            .style("fill", "none")
            .style("stroke", this.DropDownFontColor)
            .style("stroke-width", 1);

        // Drop Down List Options Inner Circle for Radio Button 
        DropDownOption
            .append("circle")
            .attr("cx", this.DropDownOptionCircleX)
            .classed("DropDownOptionInnerCircle", true)
            .attr("cy", function (d, i) {
                return i * DropDownOptionHeight + (DropDownBoxBackgroundY + DropDownOptionHeight / 2);
            })
            .attr("r", this.DropDownOptionInnerCircleR)
            .style("fill", function (d, i) {
                var color = "none"
                if (d.DropDownValue === SelectedOptionValue) {
                    color = DropDownFontColor
                }
                return color;
            })
            .style("stroke", this.DropDownFontColor)
            .style("stroke-width", 1);

    }

    // Determine Dropdown Options based on Settings
    public GetDropDownOptions() {

        let DropDownOptionsMembers = []

        if (this.VisualSettings.optionssettings.Between === true) {
            DropDownOptionsMembers[DropDownOptionsMembers.length] = ({ DropDownLabel: "Between", DropDownValue: 1 })
        }

        if (this.VisualSettings.optionssettings.GreaterThan === true) {
            DropDownOptionsMembers[DropDownOptionsMembers.length] = { DropDownLabel: "Greater Than", DropDownValue: 2 }
        }

        if (this.VisualSettings.optionssettings.LessThan === true) {
            DropDownOptionsMembers[DropDownOptionsMembers.length] = { DropDownLabel: "Less Than", DropDownValue: 3 }
        }

        if (this.VisualSettings.optionssettings.Beyond === true) {
            DropDownOptionsMembers[DropDownOptionsMembers.length] = { DropDownLabel: "Beyond", DropDownValue: 4 }
        }

        return DropDownOptionsMembers

    }

    // Determine Knob Location
    public DetermineKnobLocation() {

        if (this.SelectedOption.DropDownLabel === "Between") {

            if (this.UserMinSelectedValue === undefined) {

                this.KnobMinValue = this.SliderMinValue;

            }

            else {

                this.KnobMinValue = Math.max(this.SliderMinValue, this.UserMinSelectedValue);

            }

            this.KnobMinValue = Math.min(this.KnobMinValue, this.SliderMaxValue);


            if (this.UserMaxSelectedValue === undefined) {

                this.KnobMaxValue = this.SliderMaxValue;

            }

            else {

                this.KnobMaxValue = Math.min(this.SliderMaxValue, this.UserMaxSelectedValue);

            }

            this.KnobMaxValue = Math.max(this.KnobMaxValue, this.SliderMinValue);

        }

        if (this.SelectedOption.DropDownLabel === "Greater Than") {

            if (this.UserMinSelectedValue === undefined) {

                this.KnobMinValue = this.SliderMinValue;

            }

            else {

                this.KnobMinValue = Math.max(this.SliderMinValue, this.UserMinSelectedValue);

            }

            this.KnobMinValue = Math.min(this.KnobMinValue, this.SliderMaxValue);
            this.KnobMaxValue = this.KnobMinValue;
        }

        if (this.SelectedOption.DropDownLabel === "Less Than") {

            if (this.UserMaxSelectedValue === undefined) {

                this.KnobMaxValue = this.SliderMaxValue;

            }

            else {

                this.KnobMaxValue = Math.min(this.SliderMaxValue, this.UserMaxSelectedValue);

            }

            this.KnobMaxValue = Math.max(this.KnobMaxValue, this.SliderMinValue);
            this.KnobMinValue = this.KnobMaxValue

        }

        if (this.SelectedOption.DropDownLabel === "Beyond") {

            if (this.UserMinSelectedValue === undefined) {

                this.KnobMinValue = this.SliderMinValue;

            }

            else {

                this.KnobMinValue = Math.max(this.SliderMinValue, this.UserMinSelectedValue);

            }

            this.KnobMinValue = Math.min(this.KnobMinValue, this.SliderMaxValue);

            if (this.UserMaxSelectedValue === undefined) {

                this.KnobMaxValue = this.SliderMaxValue;

            }

            else {

                this.KnobMaxValue = Math.min(this.SliderMaxValue, this.UserMaxSelectedValue);

            }

            this.KnobMaxValue = Math.max(this.KnobMaxValue, this.SliderMinValue);

        }

        let DifferenceMinValue = this.KnobMinValue - this.SliderMinValue;
        let DifferenceMaxValue = this.SliderMaxValue - this.KnobMaxValue;

        let SliderRange = this.SliderMaxValue - this.SliderMinValue;
        let SliderStepDistance = (this.SliderWidth - 2 * this.KnobR) / SliderRange;

        if (SliderRange === 0) {

            SliderStepDistance = 0;

        }

        this.KnobMinCx = (DifferenceMinValue * SliderStepDistance) + (this.SliderX + this.KnobR);
        this.KnobMaxCx = (this.SliderWidth + this.SliderX - this.KnobR) - (DifferenceMaxValue * SliderStepDistance);

        this.KnobMin.attr('cx', this.KnobMinCx);
        this.KnobMax.attr('cx', this.KnobMaxCx);

        this.ValueLabels();
        this.SliderLabelLocation();

    }

    // Determine the slider track location based on the knob location and the selected option
    public DetermineTrackLocation() {

        // Track location if the dropdown is Between
        if (this.SelectedOption.DropDownLabel === "Between") {

            this.TrackMinX = this.KnobMinCx;
            this.TrackMinWidth = this.KnobMaxCx - this.KnobMinCx;

            this.TrackMaxX = this.KnobMinCx;
            this.TrackMaxWidth = this.KnobMaxCx - this.KnobMinCx;

        }

        // Track location if the dropdown is Greater Than
        else if (this.SelectedOption.DropDownLabel === "Greater Than") {

            this.TrackMinX = this.KnobMinCx;
            this.TrackMinWidth = this.SliderWidth - (this.KnobMinCx - this.SliderX);

            this.TrackMaxX = this.KnobMaxCx;
            this.TrackMaxWidth = this.SliderWidth - (this.KnobMaxCx - this.SliderX);

        }

        // Track location if the dropdown is Less Than
        else if (this.SelectedOption.DropDownLabel === "Less Than") {

            this.TrackMinX = this.SliderX;
            this.TrackMinWidth = this.SliderWidth - (this.SliderWidth - this.KnobMinCx + this.KnobR);

            this.TrackMaxX = this.SliderX;
            this.TrackMaxWidth = this.SliderWidth - (this.SliderWidth - this.KnobMinCx + this.KnobR);

        }

        // Track location if the dropdown is Beyond
        else if (this.SelectedOption.DropDownLabel === "Beyond") {

            this.TrackMinX = this.SliderX
            this.TrackMinWidth = this.KnobMinCx - this.SliderX

            this.TrackMaxX = this.KnobMaxCx
            this.TrackMaxWidth = (this.SliderWidth + this.SliderX) - this.KnobMaxCx

        }

        // Change the Minimum Track Location
        this.SliderMinTrack.attr("x", this.TrackMinX);
        this.SliderMinTrack.attr("width", this.TrackMinWidth);

        // Change the Maximum Track Location
        this.SliderMaxTrack.attr("x", this.TrackMaxX);
        this.SliderMaxTrack.attr("width", this.TrackMaxWidth);


    }

    // Determine the location of the Slider Value Labels
    public SliderLabelLocation() {

        // Determine Location of Minimum Value Text Box
        this.KnobMinTextBoxX = Math.max((this.LeftMargin), (this.KnobMinCx - this.KnobValueTextBoxWidth / 2));
        this.KnobMinTextBoxX = Math.min((this.LeftMargin + this.DropDownWidth - this.KnobValueTextBoxWidth), this.KnobMinTextBoxX)


        // Determine Location of Maximum Value Text Box
        this.KnobMaxTextBoxX = Math.min((this.LeftMargin + this.DropDownWidth - this.KnobValueTextBoxWidth), (this.KnobMaxCx - this.KnobValueTextBoxWidth / 2))
        this.KnobMaxTextBoxX = Math.max((this.LeftMargin), this.KnobMaxTextBoxX)

        if ((this.KnobMinTextBoxX + this.KnobValueTextBoxWidth) >= this.KnobMaxTextBoxX && (this.KnobMinTextBoxX + this.KnobValueTextBoxWidth) <= (this.KnobMaxTextBoxX + this.KnobValueTextBoxWidth) && this.KnobMinValue !== this.KnobMaxValue) {

            let overlap = this.KnobMaxTextBoxX - (this.KnobMinTextBoxX + this.KnobValueTextBoxWidth)

            this.KnobMinTextBoxX = this.KnobMinTextBoxX + (overlap / 2);
            this.KnobMaxTextBoxX = this.KnobMaxTextBoxX - (overlap / 2);

            if (this.KnobMinTextBoxX < this.LeftMargin) {

                let moveoverlap = this.LeftMargin - this.KnobMinTextBoxX

                this.KnobMinTextBoxX = this.KnobMinTextBoxX + moveoverlap
                this.KnobMaxTextBoxX = this.KnobMaxTextBoxX + moveoverlap

            }

            if (this.KnobMaxTextBoxX + this.KnobValueTextBoxWidth > this.LeftMargin + this.DropDownWidth) {

                let moveoverlap = (this.KnobMaxTextBoxX + this.KnobValueTextBoxWidth) - (this.LeftMargin + this.DropDownWidth)

                this.KnobMinTextBoxX = this.KnobMinTextBoxX - moveoverlap
                this.KnobMaxTextBoxX = this.KnobMaxTextBoxX - moveoverlap

            }

        }

        // Determine Location of Text
        this.KnobMinTextX = this.KnobMinTextBoxX + this.KnobValueTextBoxWidth / 2;
        this.KnobMaxTextX = this.KnobMaxTextBoxX + this.KnobValueTextBoxWidth / 2;

        // Change Placement Text Box and Text
        this.KnobMinValueBox.attr("x", this.KnobMinTextBoxX);
        this.KnobMinValueText.attr("x", this.KnobMinTextX);

        this.KnobMaxValueBox.attr("x", this.KnobMaxTextBoxX);
        this.KnobMaxValueText.attr("x", this.KnobMaxTextX);


    }

    // Update the minimum knob value
    public UpdatedMinKnobText() {

        let SliderRange = this.SliderMaxValue - this.SliderMinValue;
        let SliderStepDistance = SliderRange / (this.SliderWidth - 2 * this.KnobR);
        this.UserMinSelectedValue = ((this.KnobMinCx - (this.SliderX + this.KnobR)) * SliderStepDistance) + this.SliderMinValue;

        this.KnobMinValue = this.UserMinSelectedValue;

        this.ValueLabels()

    }

    // Update the maximum knob value
    public UpdatedMaxKnobText() {

        let SliderRange = this.SliderMaxValue - this.SliderMinValue;
        let SliderStepDistance = SliderRange / (this.SliderWidth - 2 * this.KnobR);
        this.UserMaxSelectedValue = ((this.KnobMaxCx - (this.SliderX + this.KnobR)) * SliderStepDistance) + this.SliderMinValue;

        this.KnobMaxValue = this.UserMaxSelectedValue;

        this.ValueLabels()

    }

    // Create Filter based on the location of the knobs
    public CreateFilter() {

        let Category = this.DataView.categorical.categories[0];

        let target: IFilterColumnTarget = extractFilterColumnTarget(Category)

        let conditions: IAdvancedFilterCondition[] = [];

        let type: AdvancedFilterLogicalOperators;

        if (this.SelectedOption.DropDownLabel === "Between") {

            conditions.push({
                operator: "GreaterThanOrEqual",
                value: this.KnobMinValue
            },
                {
                    operator: "LessThanOrEqual",
                    value: this.KnobMaxValue

                }
            )

            type = "And"

            let filter: IAdvancedFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",

                ...(new AdvancedFilter(target, type, conditions))
            }
            this.VisualHost.applyJsonFilter(filter, "general", "filter", FilterAction.merge);
        }

        else if (this.SelectedOption.DropDownLabel === "Greater Than") {

            conditions.push({
                operator: "GreaterThanOrEqual",
                value: this.KnobMinValue
            }
            )
            type = "And"

            let filter: IAdvancedFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",

                ...(new AdvancedFilter(target, type, conditions))
            }
            this.VisualHost.applyJsonFilter(filter, "general", "filter", FilterAction.merge);
        }

        else if (this.SelectedOption.DropDownLabel === "Less Than") {

            conditions.push({
                operator: "LessThanOrEqual",
                value: this.KnobMaxValue
            }
            )
            type = "And"

            let filter: IAdvancedFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",

                ...(new AdvancedFilter(target, type, conditions))
            }
            this.VisualHost.applyJsonFilter(filter, "general", "filter", FilterAction.merge);
        }

        else if (this.SelectedOption.DropDownLabel === "Beyond") {

            conditions.push({
                operator: "LessThanOrEqual",
                value: this.KnobMinValue
            },
                {
                    operator: "GreaterThanOrEqual",
                    value: this.KnobMaxValue

                }
            )

            type = "Or"

            let filter: IAdvancedFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",

                ...(new AdvancedFilter(target, type, conditions))
            }
            this.VisualHost.applyJsonFilter(filter, "general", "filter", FilterAction.merge);



        }

    }

    // Clear the existing filter
    public ClearFilter() {

        this.VisualHost.applyJsonFilter(null, "general", "filter", FilterAction.merge);

    }

    // Create text for slider value labels
    public ValueLabels() {

        if (this.VisualSettings.slidersettings.TimeFormat === true) {

            let MinHour = Math.floor(this.KnobMinValue);
            let MinMinute = Math.round((this.KnobMinValue - MinHour) * 60);
            let MinTimeofDay: string;

            if (MinMinute === 60) {

                MinHour = MinHour + 1;
                MinMinute = 0;

            }

            if (MinHour === 0) {

                MinHour = 12;
                MinTimeofDay = " AM"

            }

            else if (MinHour === 12) {

                MinHour = MinHour
                MinTimeofDay = " PM"


            }

            else if (MinHour >= 13) {

                MinHour = MinHour - 12;
                MinTimeofDay = " PM"

            }

            else {

                MinHour = MinHour
                MinTimeofDay = " AM"

            }

            let MinHourText = MinHour.toString()
            let MinMinuteText = MinMinute.toString()


            if (MinMinute < 10) {

                MinMinuteText = "0".concat(Math.round(MinMinute).toString())

            }


            let MaxHour = Math.floor(this.KnobMaxValue);
            let MaxMinute = Math.round((this.KnobMaxValue - MaxHour) * 60);
            let MaxTimeofDay: string;

            if (MaxMinute === 60) {

                MaxHour = MaxHour + 1;
                MaxMinute = 0;

            }

            if (MaxHour === 0) {

                MaxHour = 12;
                MaxTimeofDay = " AM"

            }

            else if (MaxHour === 12) {

                MaxHour = MaxHour
                MaxTimeofDay = " PM"


            }

            else if (MaxHour >= 13) {

                MaxHour = MaxHour - 12;
                MaxTimeofDay = " PM"

            }

            else {

                MaxHour = MaxHour
                MaxTimeofDay = " AM"

            }

            let MaxHourText = MaxHour.toString()
            let MaxMinuteText = Math.round(MaxMinute).toString()


            if (MaxMinute < 10) {

                MaxMinuteText = "0".concat(Math.round(MaxMinute).toString())

            }


            this.KnobMaxText = MaxHourText.concat(":").concat(MaxMinuteText).concat(MaxTimeofDay)
            this.KnobMinText = MinHourText.concat(":").concat(MinMinuteText).concat(MinTimeofDay)


        }

        else {

            let SliderLabelDecimalPlacesThousand = this.SliderLabelDecimalPlaces

            if (this.SliderLabelDecimalPlaces < 1) {

                SliderLabelDecimalPlacesThousand = 1

            }

            let SliderLabelDecimalPlacesMillion = this.SliderLabelDecimalPlaces

            if (this.SliderLabelDecimalPlaces < 2) {

                SliderLabelDecimalPlacesMillion = 2

            }

            if (this.KnobMinValue >= 1000000) {

                this.KnobMinText = (new Intl.NumberFormat('en-US', { minimumFractionDigits: SliderLabelDecimalPlacesMillion, maximumFractionDigits: SliderLabelDecimalPlacesMillion }).format(this.KnobMinValue / 1000000)).concat("M")
            
            }

            else if (this.KnobMinValue >= 10000) {

                this.KnobMinText = (new Intl.NumberFormat('en-US', { minimumFractionDigits: SliderLabelDecimalPlacesThousand, maximumFractionDigits: SliderLabelDecimalPlacesThousand }).format(this.KnobMinValue / 1000)).concat("K")

            }

            else {

                this.KnobMinText = (new Intl.NumberFormat('en-US', { minimumFractionDigits: this.SliderLabelDecimalPlaces, maximumFractionDigits: this.SliderLabelDecimalPlaces }).format(this.KnobMinValue))

            }

            if (this.KnobMaxValue >= 1000000){

                this.KnobMaxText = (new Intl.NumberFormat('en-US', { minimumFractionDigits: SliderLabelDecimalPlacesMillion, maximumFractionDigits: SliderLabelDecimalPlacesMillion }).format(this.KnobMaxValue/1000000)).concat("M")

            }

            else if (this.KnobMaxValue >= 10000) {

                this.KnobMaxText = (new Intl.NumberFormat('en-US', { minimumFractionDigits: SliderLabelDecimalPlacesThousand, maximumFractionDigits: SliderLabelDecimalPlacesThousand }).format(this.KnobMaxValue/1000)).concat("K")

            }

            else {

            this.KnobMaxText = (new Intl.NumberFormat('en-US', { minimumFractionDigits: this.SliderLabelDecimalPlaces, maximumFractionDigits: this.SliderLabelDecimalPlaces }).format(this.KnobMaxValue))

            }

        }

        this.KnobMinValueText.text(this.KnobMinText)
        this.KnobMaxValueText.text(this.KnobMaxText)

        // Update size of the value box based on the text
        let knobmintextwidth = textMeasurementService.measureSvgTextElementWidth(this.KnobMinValueText.node()) + 10;
        let knobmaxtextwidth = textMeasurementService.measureSvgTextElementWidth(this.KnobMaxValueText.node()) + 10;

        this.KnobValueTextBoxWidth = Math.max(knobmintextwidth, knobmaxtextwidth, 40);

        this.KnobMinValueBox.attr("width", this.KnobValueTextBoxWidth)
        this.KnobMaxValueBox.attr("width", this.KnobValueTextBoxWidth)


    }


}









