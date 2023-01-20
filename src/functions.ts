import powerbi from "powerbi-visuals-api";
import DataViewCategoricalColumn = powerbi.DataViewCategoricalColumn;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import FilterAction = powerbi.FilterAction;
import IVisualHost = powerbi.extensibility.visual.IVisualHost
import { IAdvancedFilter,  IAdvancedFilterCondition, AdvancedFilter } from 'powerbi-models';

interface IFilterColumnTarget{
    table:string,
    column:string
}

interface IFilterProps{
    type:"between"|"beyond"|"greaterThan"|"lessThan",
    // categories:DataViewCategoricalColumn,
    // visualHost:IVisualHost,
    minValue:number|Date,
    maxValue:number|Date,
}

export const applyFilter = (categories,visualHost)=>(filterProps:IFilterProps)=>{
    console.log(filterProps,"filterProps")
    const {type, minValue, maxValue} = filterProps

    let target: IFilterColumnTarget = {
        table: categories.source.queryName?.substr(0, categories.source.queryName.indexOf('.'))!, // table
        column: categories.source.displayName
    };


    let conditions: IAdvancedFilterCondition[] = [];

    if((type=='between')||(type=='beyond')){
        conditions.push({
            operator: "LessThanOrEqual",
            value: maxValue
        });
        conditions.push({
            operator: "GreaterThanOrEqual",
            value: minValue
        });
    } else if(type=='greaterThan') {
        conditions.push({
            operator: "GreaterThanOrEqual",
            value: minValue
        });
    } else if(type=='lessThan'){
        conditions.push({
            operator: "LessThanOrEqual",
            value: maxValue
        });
    }

    // let filter: IAdvancedFilter = AdvancedFilter(target, type=='between'?"And":"Or", conditions);


    let filter: IAdvancedFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",

        ...(new AdvancedFilter(target, type=='beyond'?"Or":"And", conditions))
    }

    // invoke the filter
    visualHost.applyJsonFilter(filter, "general", "filter", FilterAction.merge);

}