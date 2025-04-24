export interface Timeseries {
    transectId: string;
    name: string;
    service: string;
    series: Series[];
}
export interface Series {
    name: string;
    value: number;
}