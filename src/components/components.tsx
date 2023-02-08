import * as React from 'react';
import {
  SliderItem,
  GetHandleProps,
  GetTrackProps
} from 'react-compound-slider';
import * as d3 from 'd3';

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface IHandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  knobSize:number;
}


export const Handle: React.FC<IHandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
  knobSize,
}) => {
  return (
  <div
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      left: `${percent}%`,
      position: 'absolute',
      marginLeft: '-11px',
    //   marginTop: '-6px',
      zIndex: 99,
      width: knobSize,
      height: knobSize,
      cursor: 'pointer',
      borderRadius: '50%',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
    //   backgroundColor: knobFillColor,
    //   outline:knobOutline,
    //   "& :active": {
    //     backgroundColor: knobActiveFillColor,
    //     outline:knobActiveOutline,
    //   },
    }}
    {...getHandleProps(id)}
  />
)};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface ITrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  fillColor:string;
  fillOpacity:number;
  trackHeight:number;
  trackRadius:number;
  trackOutline:string;
}

// & .slider-container.slider-filter-container .ant-slider-track {
//     background-color: ${settings.sliderSettings.trackUnselectedFillColor.value.value};
//     background-color: ${settings.sliderSettings.trackUnselectedFillOpacity.value/100};
//     border-color: ${settings.sliderSettings.trackUnselectedOutlineColor.value.value};
// }

// & .slider-container.slider-filter-container .ant-slider-rail {
//     background-color: ${settings.sliderSettings.trackSelectedFillColor.value.value};
//     background-color: ${settings.sliderSettings.trackSelectedFillOpacity.value/100};
//     border-color: ${settings.sliderSettings.trackSelectedOutlineColor.value.value};
// }

// const hexColor = d3.color(bandedFillColor) as d3.RGBColor;

//   return `
//         background-color: rgba(${hexColor.r}, ${hexColor.g}, ${hexColor.b}, ${
//     bandedFillOpacity / 100
//   });

export const Track: React.FC<ITrackProps> = ({
  source,
  target,
  getTrackProps,
  fillColor,
  fillOpacity,
  trackHeight,
  trackRadius,
  trackOutline,
}) => {
    const hexColor = d3.color(fillColor) as d3.RGBColor;
    const backgroundColor = `rgba(${hexColor.r}, ${hexColor.g}, ${hexColor.b}, ${fillOpacity / 100})`
    console.log(trackOutline,"trackoutline")
    return (
        <div
            style={{
            position: 'absolute',
            height: trackHeight,
            zIndex: 1,
            backgroundColor: backgroundColor,
            borderRadius: trackRadius,
            cursor: 'pointer',
            left: `${source.percent}%`,
            width: `${target.percent - source.percent}%`,
            outline:trackOutline
            }}
            {...getTrackProps()}
        />
)};

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface ITickProps {
  key: string;
  tick: SliderItem;
  count: number;
}

export const Tick: React.FC<ITickProps> = ({ tick, count }) => (
  <div>
    <div
      style={{
        position: 'absolute',
        marginTop: 14,
        width: 1,
        height: 5,
        backgroundColor: 'rgb(200,200,200)',
        left: `${tick.percent}%`
      }}
    />
    <div
      style={{
        position: 'absolute',
        marginTop: 22,
        fontSize: 10,
        textAlign: 'center',
        marginLeft: `${-(100 / count) / 2}%`,
        width: `${100 / count}%`,
        left: `${tick.percent}%`
      }}
    >
      {tick.value}
    </div>
  </div>
);
