import * as React from 'react';
import { SliderItem, GetHandleProps, GetTrackProps } from 'react-compound-slider';
interface IHandleProps {
    domain: number[];
    handle: SliderItem;
    getHandleProps: GetHandleProps;
    knobSize: number;
}
export declare const Handle: React.FC<IHandleProps>;
interface ITrackProps {
    source: SliderItem;
    target: SliderItem;
    getTrackProps: GetTrackProps;
    fillColor: string;
    fillOpacity: number;
    trackHeight: number;
    trackRadius: number;
    trackOutline: string;
}
export declare const Track: React.FC<ITrackProps>;
interface ITickProps {
    key: string;
    tick: SliderItem;
    count: number;
}
export declare const Tick: React.FC<ITickProps>;
export {};
