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
};

export type DailyRecord = {
  type: string;
  date: string;
  data: SingleEntry[];
};

export const coffeeContracts = [
  { symbol: "WYKQ2", title: "Washed Yeki Q2" },
  { symbol: "WKFQ1", title: "Washed Yeki Q1" },
  { symbol: "LWJM1", title: "Local Washed Jimma 1" },
  { symbol: "LWBP3", title: "Local Washed Byproduct 3" },
  { symbol: "USK5", title: "Unwashed Yeki 5" },
  { symbol: "USDE4", title: "Unwashed Sidama E" },
  { symbol: "UJM4", title: "Unwashed Jimma 4" },
  { symbol: "LWBP2", title: "Local Washed Byproduct 2" },
  { symbol: "LWBP1", title: "Local Washed Byproduct 1" },
  { symbol: "LUSH1", title: "Local Unwashed Shaka 1" },
  { symbol: "LUGD5", title: "Local Unwashed Godere 5" },
  { symbol: "LUBPAA5", title: "Local Unwashed Byproduct Addis Ababa 5" },
  { symbol: "LUBPAA4", title: "Local Unwashed Byproduct Addis Ababa 4" },
  { symbol: "LUBPAA3", title: "Local Unwashed Byproduct Addis Ababa 3" },
  { symbol: "LUBPAA2", title: "Local Unwashed Byproduct Addis Ababa 2" },
  { symbol: "LUBM3", title: "Local Unwashed Bench Maji 3" },
];

export const CITIES = [
    "Jimma", "Addis Ababa", "Shaka", "Bench Maji", "Sidama", "Yeki", "Godere"
]

export const WASH_TYPES = [
    "Washed", "Unwashed"
]