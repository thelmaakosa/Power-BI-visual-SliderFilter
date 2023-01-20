interface IFilterProps {
    type: "between" | "beyond" | "greaterThan" | "lessThan";
    minValue: number | Date;
    maxValue: number | Date;
}
export declare const applyFilter: (categories: any, visualHost: any) => (filterProps: IFilterProps) => void;
export {};
