import * as React from "react";
import * as dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChartSettingsModel, SliderOptionsSettings } from "../settings";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Handle, Track, Tick } from "./components"; // example render components
import { styledHandlerDiv, styledDropdown, StyledInputDiv } from "./StyledDiv";
import { genBackgroundColor } from "./styleUtils";
import * as d3 from "d3";

dayjs.extend(duration);

class LengthInFeet{
  public feetValue:number;
  public inchesValue:number;

  constructor(value:number, type:'feet'|'inches'){
    if(type=='feet'){
      this.feetValue = Math.floor(value)
      this.inchesValue = (value - Math.floor(value))*12
    } else {
      this.feetValue = value<12?0:(value-value%12)/12
      this.inchesValue = value<12?value:value%12
    }
  }

  public feet(){
    return this.feetValue
  }

  public inches(){
    return this.inchesValue
  }

  public subtract(value:number,unit:'feet'|'inches'){
    if(unit=='feet'){
      this.feetValue  = this.feetValue - value
      return this
    } else {
      this.inchesValue  = this.inchesValue - value
      return this
    }
  }

  public add(value:number,unit:'feet'|'inches'){
    if(unit=='feet'){
      this.feetValue  = this.feetValue + value
      return this
    } else {
      this.inchesValue  = this.inchesValue + value
      return this
    }
  }

  public asFeet(){
    
      return this.feetValue+this.inchesValue/12
  }

  public asInches(){
      return this.feetValue*12 + this.inchesValue
  }
}

export interface IProps {
  defaultValue: RangeValueType;
  valueType: "Quantity" | "Time" | "CombinationTime" | "CombinationLength";
  max?: any;
  min?: any;
  unit?: string;
  combinationType?: "hourMinutes" | "feetInches" | "hourMinutesSeconds";
  combinationUnit?: TimeUnitType|LengthUnitType,
  settings: ChartSettingsModel;
  width: number;
  height: number;
  applyFilter?: any;
}
type RangeValueType = [any, any];
type TimeUnitType = "h" | "m" | "s" ;
type LengthUnitType = "feet" | "inches"
type CombinatioInputParams = {
  h: string | number;
  setH: (val: string) => void;
  m: string | number;
  setM: (val: string) => void;
  s: string | number;
  setS: (val: string) => void;
  feet:string | number;
  setFeet:(val: string) => void;
  inches:string | number;
  setInches:(val: string) => void;
};

const sliderStyle: React.CSSProperties = {
  margin: "5%",
  position: "relative",
  width: "90%",
  minHeight: "20px",
};

const railStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: 14,
  borderRadius: 7,
  cursor: "pointer",
  backgroundColor: "rgb(155,155,155)",
};
const options = [
  {
    value: "between",
    label: "Between",
  },
  {
    value: "greaterThan",
    label: "Greater Than",
  },
  {
    value: "lessThan",
    label: "Less Than",
  },
  {
    value: "beyond",
    label: "Beyond",
  },
];

const getDropdownOptions = (sliderOptionsSettings: SliderOptionsSettings) => {
  return [
    sliderOptionsSettings.between.value ? "between" : null,
    sliderOptionsSettings.beyond.value ? "beyond" : null,
    sliderOptionsSettings.greaterThan.value ? "greaterThan" : null,
    sliderOptionsSettings.lessThan.value ? "lessThan" : null,
  ].filter((d) => d);
};

interface IDropdownOptionProps {
  width: number;
  value: string;
  opValue: string;
  onOpChange: Function;
  setIsExpand: Function;
}

const DropdownOption: FC<IDropdownOptionProps> = ({
  width,
  value,
  opValue,
  onOpChange,
  setIsExpand,
}) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", width: `${width}px` }}
      onClick={() => {
        onOpChange(value);
        setIsExpand("CALLAPSE");
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: `0 10px` }}
      >
        <circle cx="7" cy="7" r="6" stroke="#003D81" stroke-width="2" />
        <circle
          cx="7"
          cy="7"
          r="4"
          fill="#003D81"
          opacity={value == opValue ? 1 : 0}
        />
      </svg>
      <div style={{ flexGrow: 1 }}>
        {options.filter((d) => d.value == value)[0].label}
      </div>
    </div>
  );
};

export const SliderFilter: FC<IProps> = ({
  defaultValue,
  max,
  min,
  unit,
  combinationType,
  combinationUnit,
  valueType,
  settings,
  width,
  height,
  applyFilter,
}) => {
  // Dropdown States
  const [isExpand, setIsExpand] = useState<"EXPAND" | "CALLAPSE">("CALLAPSE");

  const [opValue, setOpValue] = useState<string>("between");
  const [range, setRange] = useState<boolean>(false);
  const [reverse, setReverse] = useState<any>(false);
  const [sliderVal, setSliderVal] = useState<RangeValueType>(defaultValue);
  useEffect(() => setSliderVal(defaultValue), [defaultValue]);

  const [containerClassName, setContainerClassName] = useState<string>("");

  const [_max, setMax] = useState<number>(100);
  const [_min, setMin] = useState<number>(0);
  // const [baseUnit, setBaseUnit] = useState<DurationUnitType>(() => {
  //   return combinationType === "hourMinutes" ? "m" : "s";
  // });

  // input value
  // const [hr1, setHr1] = useState<string | number>("");
  // const [min1, setMin1] = useState<string | number>("");
  // const [sec1, setSec1] = useState<string | number>("");
  // const [feet1, setFeet1] = useState<string | number>("");
  // const [inches1, setInches1] = useState<string | number>("");
  // const [hr2, setHr2] = useState<string | number>("");
  // const [min2, setMin2] = useState<string | number>("");
  // const [sec2, setSec2] = useState<string | number>("");
  // const [feet2, setFeet2] = useState<string | number>("");
  // const [inches2, setInches2] = useState<string | number>("");
  // const duration1 = useRef<duration.Duration>(dayjs.duration(0));
  // const duration2 = useRef<duration.Duration>(dayjs.duration(0));

  // Time input value
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  // select change
  const onOpChange = (val: string) => {
    setRange(val === "beyond" || val === "between");
    setReverse(val === "greaterThan" || val === "beyond"); //是否反向
    setContainerClassName(val === "beyond" ? "slider-container" : "");
    setOpValue(val);
  };

  useEffect(()=>console.log(sliderVal,"sliderVal"),[sliderVal])

  //slider change 处理
  const onSliderValchange = (val: number[]) => {
    let newVal;
    // if (!Array.isArray(val)) {
    if (val.length == 1) {
      newVal =
        opValue == "lessThan"
          ? [_min, Number(val[0])]
          : ([Number(val[0]), _max] as RangeValueType);
      // newVal = [Number(val[0]),Number(val[0])]
    } else {
      newVal = [...val] as RangeValueType;
    }
    setSliderVal(newVal);
  };

  //input change 处理
  const onInputChange = (o: { val: string; index: 0 | 1 }) => {
    const { val, index } = o;
    if (index === 0) {
      setSliderVal([Number(val), sliderVal[1]]);
      applyFilter({
        type: opValue,
        minValue: Number(val),
        maxValue: sliderVal[1],
      });
    } else {
      setSliderVal([sliderVal[0], Number(val)]);
      console.log(index,"index")
      applyFilter({
        type: opValue,
        minValue: sliderVal[0],
        maxValue: Number(val),
      });
    }
  };


  const combinatioInput = (index: 0 | 1 = 0) => {
    // --111
    // let duration = index == 0 ? duration1.current : duration2.current;
    // const combinationType = 
    let opv = index == 0 ? "lessThan" : "greaterThan";
    let currentValue = ['h','s','m'].indexOf(combinationUnit)>-1?dayjs.duration(sliderVal[index],combinationUnit as TimeUnitType):new LengthInFeet(sliderVal[index],combinationUnit as LengthUnitType)
    
    const onBlur = (
      ev: React.FocusEvent<HTMLInputElement>,
      setValue: (val: string) => void
    ) => {
      if (!ev.target.value) {
        setValue("0");
        sliderVal[index] = 0;
      }
      setSliderVal([...sliderVal]);
    };

    const inputChange = (inputVal: number, unit: TimeUnitType|LengthUnitType) => {

      setSliderVal((prev)=>{
        const newSliderVal:RangeValueType = [...prev]
        let origin: number; 
        let newValue:number;
        let duration:duration.Duration | LengthInFeet;

        const getTimeDurationValue = (duration:duration.Duration)=>{
          if(combinationUnit=='h'){
            return duration.asHours()
          } else if(combinationUnit=='m'){
            return duration.asMinutes()
          } else if(combinationUnit=='s'){
            return duration.asSeconds()
          }
        }

        const getLengthDurationValue = (duration:LengthInFeet)=>{
          if(combinationUnit=='feet'){
            return duration.feet()
          } else {
            return duration.inches()
          }
        }
        // let duration = ?:
        if(["hourMinutes","hourMinutesSeconds"].indexOf(combinationType)>-1){
          duration = dayjs.duration(prev[index]);
          if (unit === "h") {
            origin = duration.hours()
            newValue = getTimeDurationValue(origin > inputVal?duration.subtract(origin - inputVal, unit as TimeUnitType):duration.add(inputVal - origin, unit as TimeUnitType));
          } else if (unit === "m") {
            origin = duration.minutes();
            newValue = getTimeDurationValue(origin > inputVal?duration.subtract(origin - inputVal, unit as TimeUnitType):duration.add(inputVal - origin, unit as TimeUnitType))
          } else {
            origin = duration.seconds();
            newValue = getTimeDurationValue(origin > inputVal?duration.subtract(origin - inputVal, unit as TimeUnitType):duration.add(inputVal - origin, unit as TimeUnitType))
          }
        } else {
          duration = new LengthInFeet(prev[index],unit as LengthUnitType)
          if(unit=='feet'){
            origin = duration.feet();
            newValue = getLengthDurationValue(origin > inputVal?duration.subtract(origin - inputVal, unit as LengthUnitType):duration.add(inputVal - origin, unit as LengthUnitType))
          } else {
            origin = duration.inches();
            newValue = getLengthDurationValue(origin > inputVal?duration.subtract(origin - inputVal, unit as LengthUnitType):duration.add(inputVal - origin, unit as LengthUnitType))
          }
        }
        if(index==0){
          newSliderVal[0] = newValue
        } else {
          newSliderVal[1] = newValue
        }
        return newSliderVal
      })
    };

    // hour input
    const hrDom = () => {
      return (
        <>
          <input
            disabled={!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === "Enter") {
                const re = /^[0-9\b]+$/;
                if ((ev.target as any).value === ''){
                  inputChange(+0, "h");
                } else if (re.test((ev.target as any).value)){
                  const val = (ev.target as any).value.replace(/\D/g, "");
                  inputChange(+val, "h");
                } else {
                  inputChange(+(currentValue as duration.Duration).hours(), "h");
                }
              }
            }}
            defaultValue={(currentValue as duration.Duration).hours()}
          />
          <span style={{ marginRight: 8 }}>{"hr"}</span>
        </>
      );
    };

    // minutes input
    const minDom = () => {
      return (
        <>
          <input
            disabled={!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === "Enter") {
                const re = /^[0-9\b]+$/;
                if ((ev.target as any).value === ''){
                  inputChange(+0, "m");
                } else if (re.test((ev.target as any).value)){
                  const val = (ev.target as any).value.replace(/\D/g, "");
                  inputChange(+val, "m");
                } else {
                  inputChange(+(currentValue as duration.Duration).minutes(), "m");
                }
              }
            }}
            defaultValue={(currentValue as duration.Duration).minutes()}
          />
          <span style={{ marginRight: 8 }}>{"min"}</span>
        </>
      );
    };

    // seconds input
    const secDom = () => {
      return (
        <>
          <input
            disabled={!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === "Enter") {
                const re = /^[0-9\b]+$/;
                if ((ev.target as any).value === ''){
                  inputChange(+0, "s");
                } else if (re.test((ev.target as any).value)){
                  const val = (ev.target as any).value.replace(/\D/g, "");
                  inputChange(+val, "s");
                } else {
                  inputChange(+(currentValue as duration.Duration).seconds(), "s");
                }
              }
            }}
            defaultValue={(currentValue as duration.Duration).seconds()}
          />
          <span style={{ marginRight: 8 }}>{"sec"}</span>
        </>
      );
    };

    // feet input
    const feetDom = () => {
      return (
        <>
          <input
            disabled={!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === "Enter") {
                const re = /^[0-9\b]+$/;
                if ((ev.target as any).value === ''){
                  inputChange(+0, "feet");
                } else if (re.test((ev.target as any).value)){
                  const val = (ev.target as any).value.replace(/\D/g, "");
                  inputChange(+val, "feet");
                } else {
                  inputChange(+(currentValue as LengthInFeet).feet(), "feet");
                }
              }
            }}
            defaultValue={(currentValue as LengthInFeet).feet()}
          />
          <span style={{ marginRight: 8 }}>{"ft"}</span>
        </>
      );
    };

    // inches input
    const inchesDom = () => {
      return (
        <>
          <input
            disabled={!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === "Enter") {
                const re = /^[0-9\b]+$/;
                if ((ev.target as any).value === ''){
                  inputChange(+0, "inches");
                } else if (re.test((ev.target as any).value)){
                  const val = (ev.target as any).value.replace(/\D/g, "");
                  inputChange(+val, "inches");
                } else {
                  inputChange(+(currentValue as LengthInFeet).inches(), "inches");
                }
              }
            }}
            defaultValue={Math.round((currentValue as LengthInFeet).inches()*100)/100}
          />
          <span style={{ marginRight: 8 }}>{"inches"}</span>
        </>
      );
    };

    if (combinationType === "hourMinutes") {
      return (
        <div className = "input-group" style={{ display: "flex", opacity: opValue == opv ? 0 : 1 ,backgroundColor:genBackgroundColor(settings.dataLabelSettings.fillColor.value.value, settings.dataLabelSettings.fillOpacity.value)}}>
          {hrDom()}
          {minDom()}
        </div>
      );
    } else if (combinationType === "hourMinutesSeconds") {
      return (
        <div className = "input-group" style={{ display: "flex", opacity: opValue == opv ? 0 : 1,backgroundColor:genBackgroundColor(settings.dataLabelSettings.fillColor.value.value, settings.dataLabelSettings.fillOpacity.value) }}>
          {hrDom()}
          {minDom()}
          {secDom()}
        </div>
      );
    } else if (combinationType === "feetInches") {
      return (
        <div className = "input-group" style={{ display: "flex", opacity: opValue == opv ? 0 : 1, backgroundColor:genBackgroundColor(settings.dataLabelSettings.fillColor.value.value, settings.dataLabelSettings.fillOpacity.value) }}>
          {feetDom()}
          {inchesDom()}
        </div>
      );
    }
  };

  const timeToInput = (index, value) => {
    // time input
    const regex =
      settings.valueTypeUnitSettings.timeFormat.value.value == "%I:%M %p"
        ? /^(0\d)|(1[0-2]):[0-5]\d /
        : /^((0|1)\d)|(2[0-4]):[0-5]\d (AM|PM)$/;
    const timeFormatStr = settings.valueTypeUnitSettings.timeFormat.value
      .value as string;
    const timeParse = d3.timeParse(timeFormatStr);
    const timeFormat = d3.timeFormat(timeFormatStr);
    return (
      <>
        <input
          disabled={!settings.dataLabelSettings.textInput.value}
          style={{ border: "none", outline: "none" }}
          defaultValue={timeFormat(new Date(sliderVal[index] + 43000))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = (e.target as any).value;
              if (regex.test(val)) {
                const seconds = timeParse(val).getSeconds() * 1000;
                const timestamp = timeParse(val).getTime() - 86400000;
                console.log(timestamp, "timestamp");
                if (index === 0) {
                  setSliderVal([timestamp, sliderVal[1]]);
                  applyFilter({
                    type: opValue,
                    minValue: new Date(timestamp).toISOString(),
                    maxValue: new Date(sliderVal[1]).toISOString(),
                  });
                } else {
                  setSliderVal([sliderVal[0], timestamp]);
                  applyFilter({
                    type: opValue,
                    minValue: new Date(sliderVal[0]).toISOString(),
                    maxValue: new Date(timestamp).toISOString(),
                  });
                }
              }
            }
          }}
        ></input>
        {/* {inputStatus=='error'?<span>Invalid Input Value</span>:null} */}
      </>
    );
  };

  //渲染input
  const renderInput = () => {
    switch (valueType) {
      case "Quantity":
        return (
          <div
            className="value-input-area"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="value-input-area"
              style={{
                display: "flex",
                opacity: opValue == "lessThan" ? 0 : 1,
                backgroundColor:genBackgroundColor(settings.dataLabelSettings.fillColor.value.value, settings.dataLabelSettings.fillOpacity.value)
              }}
            >
              <input
                disabled={!settings.dataLabelSettings.textInput.value}
                style={{
                  width: 50,
                  border: "none",
                }}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") {
                    onInputChange({ val: (ev.target as any).value, index: 0 });
                  }
                }}
                defaultValue={d3.format(`(.${settings.valueTypeUnitSettings.quantityDecimal.value}f`)(sliderVal[0])}
              />
              {settings.valueTypeUnitSettings.quantityUnit.value ? (
                <span style={{ marginRight: 8 }}>{unit}</span>
              ) : null}
            </div>
            <div
              className="value-input-area"
              style={{
                display: "flex",
                opacity: opValue == "greaterThan" ? 0 : 1,
                backgroundColor:genBackgroundColor(settings.dataLabelSettings.fillColor.value.value, settings.dataLabelSettings.fillOpacity.value)
              }}
            >
              <input
                disabled={!settings.dataLabelSettings.textInput.value}
                style={{
                  width: 50,
                  border: "none",
                }}
                defaultValue={d3.format(`(.${settings.valueTypeUnitSettings.quantityDecimal.value}f`)(sliderVal[1])}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") {
                    onInputChange({ val: (ev.target as any).value, index: 1 });
                  }
                }}
              />
              {settings.valueTypeUnitSettings.quantityUnit.value ? (
                <span style={{ marginRight: 8 }}>{unit}</span>
              ) : null}
            </div>
          </div>
        );
      case "CombinationTime":
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* 起点input */}
            {combinatioInput(0)}
            {/* 终点input */}
            {combinatioInput(1)}
          </div>
        );
        case "CombinationLength":
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* 起点input */}
              {combinatioInput(0)}
              {/* 终点input */}
              {combinatioInput(1)}
            </div>
          );
      case "Time":
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* 起点input */}
            <div
              className="value-input-area"
              style={{
                display: "flex",
                opacity: opValue == "lessThan" ? 0 : 1,
                backgroundColor:genBackgroundColor(settings.dataLabelSettings.fillColor.value.value, settings.dataLabelSettings.fillOpacity.value)
              }}
            >
              {timeToInput(0, sliderVal[0])}
            </div>
            <div
              className="value-input-area"
              style={{
                display: "flex",
                opacity: opValue == "greaterThan" ? 0 : 1,
                backgroundColor:genBackgroundColor(settings.dataLabelSettings.fillColor.value.value, settings.dataLabelSettings.fillOpacity.value)
              }}
            >
              {timeToInput(1, sliderVal[1])}
            </div>
          </div>
        );
      default:
        null;
    }
  };

  useEffect(() => {
    if (opValue === "lessThan" || opValue === "between") {
      setRange(true);
    }
    if (valueType === "Time") {
      const t1 = dayjs(defaultValue.at(0));
      const t2 = dayjs(defaultValue.at(1));
      setSliderVal([t1.valueOf(), t2.valueOf()]);
      setTime1(t1.format("HH:mm"));
      setTime2(t2.format("HH:mm"));
    }
  }, []);

  const StyledDropdown = styledDropdown(settings);
  const StyledInput = StyledInputDiv(settings);

  return (
    <div
      style={{ width: width }}
      className={`${containerClassName} slider-filter-container`}
    >
      <StyledDropdown
        className="dropdown"
        style={{
          display: settings.dropdownSettings.onOff.value ? "flex" : "none",
          width: `${width}px`,
          height: "30px",
          alignItems: "center",
        }}
        onClick={() =>
          setIsExpand(isExpand == "CALLAPSE" ? "EXPAND" : "CALLAPSE")
        }
      >
        <div style={{ flexGrow: 1 }}>
          {options.filter((d) => d.value == opValue)[0].label}
        </div>
        {isExpand == "CALLAPSE" ? (
          <svg
            width={`${settings.dropdownSettings.chevronIconSize.value}px`}
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: `0 10px` }}
          >
            <path
              d="M1 1L9 9.5L17 1"
              stroke={settings.dropdownSettings.chevronColor.value.value}
              stroke-width="2"
            />
          </svg>
        ) : (
          <svg
            width={`${18}px`}
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: `0 10px` }}
          >
            <path
              d="M1 10.5L9 2L17 10.5"
              stroke={settings.dropdownSettings.chevronColor.value.value}
              stroke-width="2"
            />
          </svg>
        )}
      </StyledDropdown>
      {isExpand == "EXPAND" ? (
        <div
          style={{
            ...{ height: `${height - 30}px` },
            ...(settings.dropdownSettings.onOff.value
              ? {}
              : { display: "none" }),
          }}
        >
          {getDropdownOptions(settings.sliderOptionsSettings).map((d) => (
            <DropdownOption
              width={width}
              value={d}
              opValue={opValue}
              onOpChange={onOpChange}
              setIsExpand={setIsExpand}
            ></DropdownOption>
          ))}
        </div>
      ) : null}

      <Slider
        mode={1}
        step={valueType == "Quantity" ? 0.01 : valueType == "Time" ? 1000 : 1}
        domain={[min, max]}
        rootStyle={sliderStyle}
        onSlideEnd={(values) => {
          const maxValue = range ? values[1] : values[0];
          applyFilter({
            type: opValue,
            minValue: valueType === "Time" ? new Date(sliderVal[0]) : values[0],
            maxValue:
              valueType === "Time" ? new Date(sliderVal[1]) : sliderVal[1],
          });
        }}
        onUpdate={onSliderValchange}
        values={
          range
            ? [...sliderVal]
            : opValue == "lessThan"
            ? [sliderVal[1]]
            : [sliderVal[0]]
        }
        // values={[100]}
        // reversed={reverse}
      >
        <Rail>
          {({ getRailProps }) => {
            const fillColor = !(opValue == "beyond")
              ? settings.sliderSettings.trackUnselectedFillColor.value.value
              : settings.sliderSettings.trackSelectedFillColor.value.value;
            const fillOpacity = !(opValue == "beyond")
              ? settings.sliderSettings.trackUnselectedFillOpacity.value
              : settings.sliderSettings.trackSelectedFillOpacity.value;
            const hexColor = d3.color(fillColor) as d3.RGBColor;
            const backgroundColor = `rgba(${hexColor.r}, ${hexColor.g}, ${
              hexColor.b
            }, ${fillOpacity / 100})`;
            const outlineColor = !(opValue == "beyond")
            ? settings.sliderSettings.trackUnselectedOutlineColor.value.value==''?'transparent':settings.sliderSettings.trackUnselectedOutlineColor.value.value
            : settings.sliderSettings.trackSelectedOutlineColor.value.value==''?'transparent':settings.sliderSettings.trackSelectedOutlineColor.value.value
            // const component = <div style={{...railStyle, backgroundColor:backgroundColor, height:settings.sliderSettings.trackHeight.value}} {...getRailProps()} />
            return (
              <div
                style={{
                  ...railStyle,
                  backgroundColor: backgroundColor,
                  height: settings.sliderSettings.trackHeight.value,
                  borderRadius: settings.sliderSettings.trackRadius.value,
                  outline:`${outlineColor} solid ${settings.sliderSettings.trackOutlineThickness.value}px`
                }}
                {...getRailProps()}
              />
            );
          }}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => {
            const HandlerDiv = styledHandlerDiv(settings);
            return (
              <HandlerDiv className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[_min, _max]}
                    getHandleProps={getHandleProps}
                    knobSize={settings.sliderSettings.knobSize.value}
                  />
                ))}
              </HandlerDiv>
            );
          }}
        </Handles>
        <Tracks
          left={range ? false : opValue == "lessThan" ? true : false}
          right={range ? false : opValue == "greaterThan" ? true : false}
        >
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                  fillColor={
                    opValue == "beyond"
                      ? settings.sliderSettings.trackUnselectedFillColor.value
                          .value
                      : settings.sliderSettings.trackSelectedFillColor.value
                          .value
                  }
                  fillOpacity={
                    opValue == "beyond"
                      ? settings.sliderSettings.trackUnselectedFillOpacity.value
                      : settings.sliderSettings.trackSelectedFillOpacity.value
                  }
                  trackHeight={settings.sliderSettings.trackHeight.value}
                  trackRadius={settings.sliderSettings.trackRadius.value}
                  trackOutline={`${opValue == "beyond"
                  ? settings.sliderSettings.trackUnselectedOutlineColor.value.value==''?'transparent':settings.sliderSettings.trackUnselectedOutlineColor.value.value
                  : settings.sliderSettings.trackSelectedOutlineColor.value.value==''?'transparent':settings.sliderSettings.trackSelectedOutlineColor.value.value} solid ${settings.sliderSettings.trackOutlineThickness.value}px`}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
      <StyledInput
        className="value-input"
        style={{
          ...{ width: width },
          ...(settings.dataLabelSettings.onOff.value
            ? {}
            : { display: "none" }),
        }}
      >
        {renderInput()}
      </StyledInput>
    </div>
  );
};

export default SliderFilter;
