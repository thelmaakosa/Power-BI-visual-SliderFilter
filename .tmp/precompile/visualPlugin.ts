import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var TriskeleSliderFilter935F6AEA513F42668552902CA227A40E: IVisualPlugin = {
    name: 'TriskeleSliderFilter935F6AEA513F42668552902CA227A40E',
    displayName: 'Triskele SliderFilter',
    class: 'Visual',
    apiVersion: '5.2.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = globalThis.dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["TriskeleSliderFilter935F6AEA513F42668552902CA227A40E"] = TriskeleSliderFilter935F6AEA513F42668552902CA227A40E;
}
export default TriskeleSliderFilter935F6AEA513F42668552902CA227A40E;