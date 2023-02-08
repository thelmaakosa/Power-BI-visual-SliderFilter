import styled from "styled-components";
import { ChartSettingsModel } from "../settings";
import { genBorder, genFontStyle, genBackground } from "./styleUtils";

export const StyledInputDiv = (settings: ChartSettingsModel) => styled.div`
    ${genFontStyle(
        settings.dataLabelSettings.fontBold.value,
        settings.dataLabelSettings.fontColor.value.value,
        settings.dataLabelSettings.fontFamily.value,
        settings.dataLabelSettings.fontItalic.value,
        settings.dataLabelSettings.fontSize.value,
        settings.dataLabelSettings.fontUnderline.value
        )}
    >div {
        & div{
            ${genBorder(
                settings.dataLabelSettings.outlineTop.value,
                settings.dataLabelSettings.outlineRight.value,
                settings.dataLabelSettings.outlineBottom.value,
                settings.dataLabelSettings.outlineLeft.value,
                settings.dataLabelSettings.outlineRadiusTopLeft.value,
                settings.dataLabelSettings.outlineRadiusTopRight.value,
                settings.dataLabelSettings.outlineRadiusBottomRight.value,
                settings.dataLabelSettings.outlineRadiusBottomLeft.value,
                settings.dataLabelSettings.outlineColor.value.value,
                settings.dataLabelSettings.outlineThickness.value
            )}
            &:hover {
                ${genBorder(
                    settings.dataLabelSettings.outlineTop.value,
                    settings.dataLabelSettings.outlineRight.value,
                    settings.dataLabelSettings.outlineBottom.value,
                    settings.dataLabelSettings.outlineLeft.value,
                    settings.dataLabelSettings.outlineRadiusTopLeft.value,
                    settings.dataLabelSettings.outlineRadiusTopRight.value,
                    settings.dataLabelSettings.outlineRadiusBottomRight.value,
                    settings.dataLabelSettings.outlineRadiusBottomLeft.value,
                    settings.dataLabelSettings.focusOutlineColor.value.value,
                    settings.dataLabelSettings.outlineThickness.value
                )}
            }
            >input{
                text-align: center;
            }
        }
    }
`;


export const styledHandlerDiv = (settings:ChartSettingsModel)=>{
    return  styled.div`    
    & div {
        ${genBackground(settings.sliderSettings.knobInactiveFillColor.value.value,settings.sliderSettings.knobInactiveFillOpacity.value)}
        outline: ${settings.sliderSettings.knobInactiveOutlineColor.value.value} solid ${settings.sliderSettings.knobOutilineThickness.value}px;
        margin-top:${-(settings.sliderSettings.knobSize.value/2 - settings.sliderSettings.trackHeight.value/2)}px;
        &:hover{
            ${genBackground(settings.sliderSettings.knobActiveFillColor.value.value,settings.sliderSettings.knobActiveFillOpacity.value)}
            outline: ${settings.sliderSettings.knobActiveOutlineColor.value.value} solid ${settings.sliderSettings.knobOutilineThickness.value}px;
        }
    }`
}

export const styledDropdown = (settings:ChartSettingsModel)=>{
    console.log(settings.dropdownSettings,"settings.dropdownSettings.fontFamily.value,")
    return styled.div`
        background-color: ${settings.dropdownSettings.fillColor.value.value};
        ${genBorder(
        settings.dropdownSettings.outlineTop.value,
        settings.dropdownSettings.outlineRight.value,
        settings.dropdownSettings.outlineBottom.value,
        settings.dropdownSettings.outlineLeft.value,
        settings.dropdownSettings.outlineRadiusTopLeft.value,
        settings.dropdownSettings.outlineRadiusTopRight.value,
        settings.dropdownSettings.outlineRadiusBottomRight.value,
        settings.dropdownSettings.outlineRadiusBottomLeft.value,
        settings.dropdownSettings.outlineColor.value.value,
        settings.dropdownSettings.outlineThickness.value
        )}
        ${genFontStyle(
        settings.dropdownSettings.fontBold.value,
        settings.dropdownSettings.fontColor.value.value,
        settings.dropdownSettings.fontFamily.value,
        settings.dropdownSettings.fontItalic.value,
        settings.dropdownSettings.fontSize.value,
        settings.dropdownSettings.fontUnderline.value
        )}
        &:hover {
            border-color: ${settings.dropdownSettings.focusOutlineColor.value.value};
        }
    `
}
