export type SingleEntry = {
    symbol: string;
    warehouseCode: string;
    productionYear: string;
    prevClose: number;
    close: number;
    change: number;
    high: number;
    low: number;
    volume: number;
}

export type DailyRecord = {
    type: string;
    date: string;
    data: SingleEntry[];
}