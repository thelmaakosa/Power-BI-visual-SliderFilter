export declare const genFontStyle: (fontBold?: boolean | string, fontColor?: string, fontFamily?: string, fontItalic?: boolean, fontSize?: number, fontUnderline?: boolean, position?: string, stepIndentation?: number, wordWrap?: boolean) => string;
export declare const genBackground: (fillColor?: string, fillOpacity?: number) => string;
export declare const genBackgroundColor: (fillColor?: string, fillOpacity?: number) => string;
export declare const genBorder: (outlineTop?: boolean, outlineRight?: boolean, outlineBottom?: boolean, outlineLeft?: boolean, outlineRadiusTopLeft?: number, outlineRadiusTopRight?: number, outlineRadiusBottomRight?: number, outlineRadiusBottomLeft?: number, outlineColor?: string, outlineThickness?: number) => string;
export declare const genBandedBackgroud: (bandedFillColor?: string, bandedFillOpacity?: number) => string;
/**
 *     outline: darkblue;
    outline-width: 5px;
    outline-style: solid;
    border-radius: 10px;
 */
export declare const genIconStyle: (expandCollapseFillColor?: string, expandCollapseIconColor?: string, expandCollapseIcon?: string, expandCollapseOutlineColor?: string, expandCollapseOutlineRadius?: number, expandCollapseOutlineThickness?: number) => string;
export declare const genRowLayout: (rowHeight?: string, rowPadding?: number) => string;
