import * as React from "react";
import * as dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChartSettingsModel, SliderOptionsSettings } from "../settings";
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { Handle, Track, Tick } from './components'; // example render components
import { styledHandlerDiv, styledDropdown, StyledInputDiv } from "./StyledDiv"
import * as d3 from "d3";


dayjs.extend(duration);
// import style from './slider.css'
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
  applyFilter:any
}
type RangeValueType = [any, any];
type TimeUnitType = "h" | "m" | "s";
type CombinatioInputParams = {
  h: string | number;
  setH: (val: string) => void;
  m: string | number;
  setM: (val: string) => void;
  s: string | number;
  setS: (val: string) => void;
};

const sliderStyle: React.CSSProperties = {
  margin: '5%',
  position: 'relative',
  width: '90%',
  minHeight: '20px'
};

const railStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)'
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
      <div style={{ flexGrow: 1 }}>{options.filter(d=>d.value==value)[0].label}</div>
    </div>
  );
};

export const SliderFilter: FC<IProps> = ({
  defaultValue,
  max,
  min,
  Unit,
  combinationType,
  valueType,
  settings,
  width,
  height,
  applyFilter
}) => {
  // Dropdown States
  const [isExpand, setIsExpand] = useState<"EXPAND" | "CALLAPSE">("CALLAPSE");
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(
    getDropdownOptions(settings.sliderOptionsSettings)
  );

  const [opValue, setOpValue] = useState<string>("between");
  const [range, setRange] = useState<boolean>(false);
  const [reverse, setReverse] = useState<any>(false);
  const [sliderVal, setSliderVal] = useState<RangeValueType>(defaultValue)
  useEffect(()=>setSliderVal(defaultValue),[defaultValue])

  const [containerClassName, setContainerClassName] = useState<string>("");

  const [_max, setMax] = useState<number>(100);
  const [_min, setMin] = useState<number>(0);
  // // 时间-复合单位基本单位
  const [baseUnit, setBaseUnit] = useState<TimeUnitType>(() => {
    return combinationType === "hourMinutes" ? "m" : "s";
  });

  // 时间-复合单位input value
  const [hr1, setHr1] = useState<string | number>("");
  const [min1, setMin1] = useState<string | number>("");
  const [sec1, setSec1] = useState<string | number>("");
  const [hr2, setHr2] = useState<string | number>("");
  const [min2, setMin2] = useState<string | number>("");
  const [sec2, setSec2] = useState<string | number>("");
  const duration1 = useRef<duration.Duration>(dayjs.duration(0));
  const duration2 = useRef<duration.Duration>(dayjs.duration(0));

  // Time input value
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  // 数据更新后执行（调用外部函数也写在这里）
  const callback = useCallback((minVal: number, maxVal: number) => {
  }, []);

  // select change 处理
  const onOpChange = (val: string) => {
    setRange(val === "beyond" || val === "between");
    setReverse(val === "greaterThan" || val === "beyond"); //是否反向
    // 添加容器类名
    setContainerClassName(val === "beyond" ? "slider-container" : "");
    setOpValue(val);
    // setSliderVal([...sliderVal])
  };

  //slider change 处理
  const onSliderValchange = (val: number[]) => {

    let newVal;
    // if (!Array.isArray(val)) {
    if(val.length==1){
      newVal = opValue =='lessThan'?[_min,Number(val[0])]:[Number(val[0]), _max] as RangeValueType;
      // newVal = [Number(val[0]),Number(val[0])]
    } else {
      newVal = [...val] as RangeValueType;
    }
    setSliderVal(newVal);

    if (valueType === "Combination") {
      duration1.current = dayjs.duration(newVal[0], baseUnit);
      duration2.current = dayjs.duration(newVal[1], baseUnit);
      updateInputVal();
      callback(newVal[0], newVal[1]);
    }
  };

  //input change 处理
  const onInputChange = (o: { val: string; index: 0 | 1 }) => {
    const { val, index } = o;
    if (index === 0) {
      setSliderVal([Number(val), sliderVal[1]]);
      applyFilter({type:opValue,minValue:Number(val), maxValue:sliderVal[1]});
    } else {
      setSliderVal([sliderVal[0], Number(val)]);
      applyFilter({type:opValue,minValue:sliderVal[0], maxValue:Number(val)});
    }
  };

  // 时间复合单位更新input value
  const updateInputVal = useCallback(() => {
    setHr1(duration1.current.hours()+duration1.current.days()*24);
    setMin1(duration1.current.minutes());
    setSec1(duration1.current.seconds());

    setHr2(duration2.current.hours()+duration2.current.days()*24);
    setMin2(duration2.current.minutes());
    setSec2(duration2.current.seconds());

  }, []);

  // 格式化单位
  const formatUnit = (type?: TimeUnitType) => {
    if (valueType === "Quantity") {
      // return `${val} ${Unit}`
      let unit = Unit;
      // switch (Unit) {
      //   case "hr":
      //     unit = "hrs";
      //     break;
      //   case "min":
      //     unit = "mins";
      //     break;
      //   case "sec":
      //     unit = "sec";
      //     break;
      //   default:
      //     unit = Unit!;
      //     break;
      // }
      return unit;
    } else if (valueType === "Combination") {
      switch (combinationType) {
        case "hourMinutes":
          return type === "h" ? `hrs` : `mins`;
        case "mins&secs":
          return type === "m" ? `mins` : `sec`;
        default:
          return type === "h" ? `hrs` : type === "m" ? `mins` : `sec`;
      }
    } else {
    }
  };

  // 时间-复合单位input渲染
  const combinatioInput = (index: 0 | 1 = 0, param: CombinatioInputParams) => {
    let duration = index == 0 ? duration1.current : duration2.current;
    let opv = index==0?'lessThan':'greaterThan'
    // 失焦如果输入框是空填充0
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
    // 编辑处理
    const inputChange = (inputVal: number, unit: TimeUnitType) => {
      let origin: number; //原有数据
      if (unit === "h") {
        origin = duration.hours()+duration.days()*24;
      } else if (unit === "m") {
        origin = duration.minutes();
      } else {
        origin = duration.seconds();
      }
      const ref = index === 0 ? duration1 : duration2;
      // 比较数据
      if (origin > inputVal) {
        ref.current = duration = duration.subtract(origin - inputVal, unit);
      } else if (origin < inputVal) {
        ref.current = duration = duration.add(inputVal - origin, unit);
      }
      // 更新
      if (baseUnit === "m") {
        sliderVal[index] = duration.asMinutes();
      } else {
        sliderVal[index] = duration.asSeconds();
      }
      setSliderVal([...sliderVal]);
      // 执行回调
      callback(sliderVal[0], sliderVal[1]);
      // applyFilter({type:opValue,minValue:sliderVal[0], maxValue:sliderVal[1]});
      
    };

    // 时 input
    const hrDom = () => {
      return (
        <>
          <input
            disabled = {!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === 'Enter') {
                const val = (ev.target as any).value.replace(/\D/g, "");
                if (val) {
                  inputChange(+val, "h");
                }
                param.setH(val);
              }
            }}
            onBlur={(ev) => onBlur(ev, param.setH)}
            defaultValue={param.h}
          />
          <span style={{ marginRight: 8 }}>{formatUnit("h")}</span>
        </>
      );
    };

    // 分 input
    const minDom = () => {
      return (
        <>
          <input
            disabled = {!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === 'Enter') {
                const val = (ev.target as any).value.replace(/\D/g, "");
              if (val) {
                inputChange(+val, "m");
              }
              param.setM(val);
              sliderVal[index] = duration.asMinutes();
              setSliderVal([...sliderVal]);
              }
            }}
            onBlur={(ev) => onBlur(ev, param.setM)}
            defaultValue={param.m}
          />
          <span style={{ marginRight: 8 }}>{formatUnit("m")}</span>
        </>
      );
    };

    // 秒 input
    const secDom = () => {
      return (
        <>
          <input
            disabled = {!settings.dataLabelSettings.textInput.value}
            style={{
              border: "none",
              outline: "none",
              width: 20,
            }}
            onKeyUp={(ev) => {
              if (ev.key === 'Enter') {
                const val = (ev.target as any).value.replace(/\D/g, "");
              if (val) {
                inputChange(+val, "s");
              }
              param.setS(val);
              sliderVal[index] = duration.asMinutes();
              setSliderVal([...sliderVal]);
              }
            }}
            onBlur={(ev) => onBlur(ev, param.setS)}
            defaultValue={param.s}
          />
          <span style={{ marginRight: 8 }}>{formatUnit("s")}</span>
        </>
      );
    };

    if (combinationType === "hourMinutes") {
      return (
        <div style={{ display: "flex",  opacity:opValue==opv?0:1}}>
          {hrDom()}
          {minDom()}
        </div>
      );
    } else if (combinationType === "mins&secs") {
      return (
        <div style={{ display: "flex",  opacity:opValue==opv?0:1}}>
          {minDom()}
          {secDom()}
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex",  opacity:opValue==opv?0:1}}>
          {hrDom()}
          {minDom()}
          {secDom()}
        </div>
      );
    }
  };

  const timeToInput = (index,value)=>{
    // time input
      const regex = settings.valueTypeUnitSettings.timeFormat.value.value=="%I:%M %p"?/^(0\d)|(1[0-2]):[0-5]\d /:/^((0|1)\d)|(2[0-4]):[0-5]\d (AM|PM)$/
      const timeFormatStr = settings.valueTypeUnitSettings.timeFormat.value.value as string
      const timeParse = d3.timeParse(timeFormatStr)
      const timeFormat = d3.timeFormat(timeFormatStr)
      return (
        <>
          <input
            disabled = {!settings.dataLabelSettings.textInput.value}
            style={{border:'none',outline:'none'}}
            defaultValue={timeFormat(new Date(sliderVal[index]+43000))}
            onKeyDown = {(e)=>{
                if (e.key === 'Enter') {
                  const val = (e.target as any).value
                if(regex.test(val)){
                  const seconds = timeParse(val).getSeconds()*1000
                  const timestamp = timeParse(val).getTime()-86400000
                  console.log(timestamp,"timestamp")
                  if (index === 0) {
                    setSliderVal([timestamp, sliderVal[1]]);
                    applyFilter({type:opValue,minValue:new Date(timestamp).toISOString(), maxValue:new Date(sliderVal[1]).toISOString()});
                  } else {
                    setSliderVal([sliderVal[0], timestamp]);
                    applyFilter({type:opValue,minValue:new Date(sliderVal[0]).toISOString(), maxValue:new Date(timestamp).toISOString()});
                  }
                }
              }
            }}
            >
          </input>
          {/* {inputStatus=='error'?<span>Invalid Input Value</span>:null} */}
        </>
      );
  }

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
              justifyContent:"space-between"
            }}
          >
            <div className="value-input-area" style={{ display: "flex",  opacity:opValue=='lessThan'?0:1}}>
              <input
                disabled = {!settings.dataLabelSettings.textInput.value}
                style={{
                  width: 45,
                  border: 'none'
                }}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    onInputChange({ val: (ev.target as any).value, index: 0 });
                  }
                }}
                
                defaultValue={valueType=='Quantity'?Math.round(sliderVal[0]*100)/100:sliderVal[0]}
              />
              {settings.valueTypeUnitSettings.quantityUnit.value?<span style={{ marginRight: 8 }}>{formatUnit()}</span>:null}
            </div>
              <div className="value-input-area" style={{ display: "flex",  opacity:opValue=='greaterThan'?0:1}}>
                <input
                  disabled = {!settings.dataLabelSettings.textInput.value}
                  style={{
                    width: 45,
                    border: 'none'
                  }}
                  defaultValue={valueType=='Quantity'?Math.round(sliderVal[1]*100)/100:sliderVal[1]}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      onInputChange({ val: (ev.target as any).value, index: 0 });
                    }
                  }}
                />
                {settings.valueTypeUnitSettings.quantityUnit.value?<span style={{ marginRight: 8 }}>{formatUnit()}</span>:null}
              </div>
          </div>
        );
      case "Combination":
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent:"space-between"
            }}
          >
            {/* 起点input */}
            {combinatioInput(0, {
              h: hr1,
              setH: setHr1,
              m: min1,
              setM: setMin1,
              s: sec1,
              setS: setSec1,
            })}
            {/* 终点input */}
              {combinatioInput(1, {
                  h: hr2,
                  setH: setHr2,
                  m: min2,
                  setM: setMin2,
                  s: sec2,
                  setS: setSec2,
                })}
          </div>
        );
      case "Time":
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent:"space-between"
            }}
          >
            {/* 起点input */}
            <div className="value-input-area" style={{ display: "flex",  opacity:opValue=='lessThan'?0:1}}>
              {timeToInput(0, sliderVal[0])}
            </div>
            <div className="value-input-area" style={{ display: "flex",  opacity:opValue=='greaterThan'?0:1}}>
              {timeToInput(1, sliderVal[1])}
            </div>
            
          </div>
        );

        default:null
    }
  };

  // 渲染标题
  // const renderTitle = useMemo(() => {
  //   if (valueType === "Quantity") {
  //     switch (Unit) {
  //       case "hr":
  //         return `Hours(${Unit})`;
  //       case "min":
  //         return `Minutes(${Unit})`;
  //       case "sec":
  //         return `Seconds(${Unit})`;
  //       default:
  //         return `Kilocalories(${Unit})`;
  //     }
  //   } else if (valueType === "Combination") {
  //     switch (combinationType) {
  //       case "hourMinutes":
  //         return "Hours & Minutes";
  //       case "mins&secs":
  //         return "Minute & Seconds";
  //       case "hours&mins&secs":
  //         return "Hours & Minutes & Seconds";
  //       default:
  //         return `Seconds(${Unit})`;
  //     }
  //   } else {
  //     return "Time";
  //   }
  // }, [valueType]);

  useEffect(() => {
    // 时间区间复合单位初始赋值
    if (valueType === "Combination") {
      duration1.current = dayjs.duration(sliderVal[0], baseUnit);
      duration2.current = dayjs.duration(sliderVal[1], baseUnit);
      updateInputVal();
    }
    // 设置slider max 和 min 值
    if (valueType === "Time") {
      // setMax(Math.abs((max as Date).getTime()));
      // setMin(Math.abs((min as Date).getTime()));
      setMax(max);
      setMin(min);
    } else {
      setMax(max);
      setMin(min);
    }
  }, [valueType]);

  useEffect(() => {
    if (opValue === "lessThan" || opValue === "between") {
      setRange(true);
    }
    if (valueType === "Time") {
      // const t1 = dayjs(Math.abs((defaultValue.at(0) as Date).getTime()));
      // const t2 = dayjs(Math.abs((defaultValue.at(1) as Date).getTime()));
      const t1 = dayjs(defaultValue.at(0));
      const t2 = dayjs(defaultValue.at(1));
      setSliderVal([t1.valueOf(), t2.valueOf()]);
      setTime1(t1.format("HH:mm"));
      setTime2(t2.format("HH:mm"));
    }
  }, []);

  const StyledDropdown = styledDropdown(settings)
  const StyledInput = StyledInputDiv(settings)
  
  return (
    <div
      style={{ width: width }}
      className={`${containerClassName} slider-filter-container`}
    >
      <StyledDropdown
        className="dropdown"
        style={{
          display: settings.dropdownSettings.onOff.value?"flex":'none',
          width: `${width}px`,
          height: "30px",
          alignItems: "center",
          
        }}
        onClick={() =>
          setIsExpand(isExpand == "CALLAPSE" ? "EXPAND" : "CALLAPSE")
        }
      >
        <div
          style={{ flexGrow: 1 }}
        >
          {options.filter(d=>d.value==opValue)[0].label}
        </div>
        {isExpand == "CALLAPSE" ? (
          <svg
            width={`${18}px`}
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: `0 10px` }}
          >
            <path d="M1 1L9 9.5L17 1" stroke={settings.dropdownSettings.chevronColor.value.value} stroke-width="2" />
          </svg>
        ) : (
          <svg
            width={`${18}px`}
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: `0 10px` }}
          >
            <path d="M1 10.5L9 2L17 10.5" stroke={settings.dropdownSettings.chevronColor.value.value} stroke-width="2" />
          </svg>
        )}
      </StyledDropdown>
      {isExpand == "EXPAND" ? (
        <div style={{...{ height: `${height - 30}px`},...settings.dropdownSettings.onOff.value?{}:{display:"none"}}}>
          {dropdownOptions.map((d) => (
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
          step={valueType=='Quantity'?0.01:valueType=='Time'?1000:1}
          domain={[min, max]}
          rootStyle={ sliderStyle }
          onSlideEnd={ (values)=>{
            const maxValue = range?values[1]:values[0]
            applyFilter({type:opValue,minValue:valueType === "Time"?new Date(sliderVal[0]):values[0], maxValue:valueType === "Time"?new Date(sliderVal[1]):sliderVal[1]})
          } }
          onUpdate={onSliderValchange}
          values={range?[...sliderVal]:opValue=='lessThan'?[sliderVal[1]]:[sliderVal[0]]}
          // values={[100]}
          // reversed={reverse}
        >
          <Rail>
            {({ getRailProps }) => {
              const fillColor = !(opValue=='beyond')?settings.sliderSettings.trackUnselectedFillColor.value.value:settings.sliderSettings.trackSelectedFillColor.value.value
              const fillOpacity = !(opValue=='beyond')?settings.sliderSettings.trackUnselectedFillOpacity.value:settings.sliderSettings.trackSelectedFillOpacity.value
              const hexColor = d3.color(fillColor) as d3.RGBColor;
              const backgroundColor = `rgba(${hexColor.r}, ${hexColor.g}, ${hexColor.b}, ${fillOpacity / 100})`
              // const component = <div style={{...railStyle, backgroundColor:backgroundColor, height:settings.sliderSettings.trackHeight.value}} {...getRailProps()} />
              return (
              <div style={{...railStyle, backgroundColor:backgroundColor, height:settings.sliderSettings.trackHeight.value}} {...getRailProps()} />
                
              )
            }}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => {
              const HandlerDiv = styledHandlerDiv(settings)
              return(
                <HandlerDiv className="slider-handles">
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[_min, _max]}
                      getHandleProps={getHandleProps}
                      knobSize={settings.sliderSettings.knobSize.value}
                    />
                  ))}
              </HandlerDiv>
            )}}
          </Handles>
          <Tracks left={range?false:opValue=='lessThan'?true:false} right={range?false:opValue=='greaterThan'?true:false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    fillColor = {opValue=='beyond'?settings.sliderSettings.trackUnselectedFillColor.value.value:settings.sliderSettings.trackSelectedFillColor.value.value}
                    fillOpacity = {opValue=='beyond'?settings.sliderSettings.trackUnselectedFillOpacity.value:settings.sliderSettings.trackSelectedFillOpacity.value}
                    trackHeight = {settings.sliderSettings.knobSize.value}
                    trackRadius = {settings.sliderSettings.trackRadius.value}
                    trackOutline = {`{${settings.sliderSettings.trackSelectedOutlineColor.value.value} solid ${settings.sliderSettings.trackOutlineThickness.value}px}`}
                  />
                ))}
              </div>
            )}
          </Tracks>
      </Slider>
      <StyledInput className="value-input" style={{...{width:width},...settings.dataLabelSettings.onOff.value?{}:{display:"none"}}}>{renderInput()}</StyledInput>
    </div>
  );
};

export default SliderFilter;
