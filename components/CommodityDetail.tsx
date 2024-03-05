"use client";
import { FormEvent, useEffect, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CITIES, WASH_TYPES, coffeeContracts } from "@/types";

//subcommodiity
type DailyEntry = {
  symbol: string;
  warehouseCode: string;
  productionYear: string;
  prevClose: number;
  close: number;
  change: number;
  high: number;
  low: number;
  volume: number;
  date: string;
};

const CommodityDetail = ({ data, id }: any) => {
  const [cleanedcommonditydata, setcleanedcommonditydata] = useState(data);

  //filters

  const uniqueWashTypes = [
    ...new Set(
      coffeeContracts.map((contract) =>
        contract.title.toLowerCase().includes("washed") ? "Washed" : "Unwashed"
      )
    ),
  ];
  const uniqueLocations = [
    ...new Set(
      coffeeContracts.map((contract) => contract.title.split(" ").slice(-1)[0])
    ),
  ];

  const [filters, setFilters] = useState({
    dateFilters: "",
    locationfilters: [],
    washtypefilters: [],
  });

  //clean the raw data
  useEffect(() => {
    let typesOfCoffee: any = {};

    data.forEach((item: any) => {
      item.data.forEach((inneritem: any) => {
        const { symbol } = inneritem;

        if (!typesOfCoffee[symbol]) {
          typesOfCoffee[symbol] = [];
        }

        const existingEntryIndex = typesOfCoffee[symbol].findIndex(
          (entry: any) => entry.date === item.date
        );

        delete inneritem._id;

        if (existingEntryIndex === -1) {
          typesOfCoffee[symbol].push({
            date: item.date,
            ...inneritem,
          });
        }
      });
    });

    const arrayedData = Object.entries(typesOfCoffee).map(([key, value]) => ({
      [key]: value,
    }));

    setcleanedcommonditydata(arrayedData);

    console.log(uniqueLocations);
  }, []);

  return (
    <div className="px-2 md:px-14 py-4 sm:py-12 flex flex-col">
      {/* Title */}
      <div className="border-2 border-primary rounded-md p-10 flex flex-row justify-between items-center mx-2">
        <div>
          <h1 className="font-josefin text-[26px]">{id.toUpperCase()}</h1>
          <h4>Overview</h4>
          <p className="mt-6 text-slate-600 text-xs">
            {id == 'coffee' && 'Prices are in Birr/ Feresulla | 1 Feresulla= 17Kg'}
            {id == 'sesame' && 'Price Birr / Quintal | 1 Quintal = 100 Kg.'}
            </p>
        </div>

        {/* [ ] this a temp solution */}
        {cleanedcommonditydata?.length > 10 && (
          <h3 className="text-center text-sm mt-4">
            Tracking {cleanedcommonditydata && cleanedcommonditydata.length}{" "}
            contracts
          </h3>
        )}
      </div>

      {/* Date filter */}
      {/* <div>
        <CommodityFilter />
      </div> */}
      {/*Location Filters  */}
      {/* <div className="my-3 mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {CITIES.map((city: string) => (
          <div
            key={city}
            className="flex items-center  bg-primary-night text-white px-3 py-1 rounded-lg font-xs"
          >
            <span>{city}</span>
          </div>
        ))}
      </div> */}
      {/*Wash Filters  */}
      {/* <div className="my-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {WASH_TYPES.map((washtype: string) => (
          <div
            key={washtype}
            className="flex items-center bg-cyan-800 text-white px-3 py-1 rounded-lg"
          >
            <span>{washtype}</span>
          </div>
        ))}
      </div> */}

      {/* the individual cards */}
      {/* gonna filterable on card */}
      <div className="mt-10">
        {cleanedcommonditydata?.length < 10 && (
          <div className="flex gap-x-6 items-center justify-center mt-28">
            <span className="animate-spin text-5xl text-gray-400 rounded-lg">
              .
            </span>
          </div>
        )}

        {cleanedcommonditydata &&
          cleanedcommonditydata.map((subcommodity: any) => {
            const [key, value] = Object.entries(subcommodity)[0];

            if (key != "recordID")
              return (
                <div key={key} className="py-2 my-4">
                  <div className="flex flex-row justify-start items-center gap-x-4">
                    {/* Badge for symbol */}
                    <span className=" bg-primary text-white p-2 rounded-md text-xs">
                      {key}
                    </span>

                    <span className="text-base">
                      {
                        coffeeContracts.find(
                          (contract) => contract.symbol === key
                        )?.title
                      }
                    </span>
                  </div>

                  {/* is a table */}
                  <div className="min-w-lg overflow-x-auto ">
                    <Subcommodity key={key} subcommodity={value} />
                  </div>
                </div>
              );
          })}
      </div>
    </div>
  );
};

const columnHelper = createColumnHelper<DailyEntry>();

const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => <span className="text-nowrap">{info.getValue()}</span>,
  }),
  columnHelper.accessor("high", {
    header: "High",
  }),
  columnHelper.accessor("low", {
    header: "Low",
  }),
  columnHelper.accessor("close", {
    header: "Close",
  }),
  // columnHelper.accessor("prevClose", {
  //   header: "Prev Day Close",
  // }),
  // columnHelper.accessor("change", {
  //   header: "Change",
  // }),
  columnHelper.accessor("volume", {
    header: "Volume Traded (Tons)",
  }),
];

const Subcommodity = ({ subcommodity }: any) => {
  const table = useReactTable({
    data: subcommodity,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full border  rounded-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-black border-2 p-2 text-left font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-black border-2 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center justify-between gap-2 flex-col md:flex-row">
        <div>
          {/* buttons */}
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>

        <div className="flex items-center gap-x-4">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div />
    </div>
  );
};

const CommodityFilter = () => {
  // option data
  // [ ] move it out
  const dateOptions = [
    { value: "last7days", label: "Last 7 Days" },
    { value: "lastMonth", label: "Last Month" },
    { value: "last6months", label: "Last Six Months" },
    { value: "custom", label: "Custom" },
  ];

  //tracking state
  const [isLoading, setIsLoading] = useState(false);

  const [fromdate, setfromdate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [todate, settodate] = useState(new Date().toISOString().split("T")[0]);

  const [dateOption, setDateOption] = useState("today");

  // handlers
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!fromdate || !todate) return;

    try {
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dateOption === "custom") {
      setfromdate("");
      settodate("");
    } else {
      // Update fromdate and todate based on selected dateOption
      const currentDate = new Date();
      let fromDate = "";
      let toDate = "";

      switch (dateOption) {
        case "today":
          fromDate = currentDate.toISOString().split("T")[0];
          toDate = fromDate;
          break;
        case "yesterday":
          const yesterday = new Date(currentDate);
          yesterday.setDate(currentDate.getDate() - 1);
          fromDate = yesterday.toISOString().split("T")[0];
          toDate = fromDate;
          break;
        case "last7days":
          const last7days = new Date(currentDate);
          last7days.setDate(currentDate.getDate() - 6);
          fromDate = last7days.toISOString().split("T")[0];
          toDate = currentDate.toISOString().split("T")[0];
          break;
        case "lastMonth":
          const lastMonth = new Date(currentDate);
          lastMonth.setMonth(currentDate.getMonth() - 1);
          fromDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)
            .toISOString()
            .split("T")[0];
          toDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          )
            .toISOString()
            .split("T")[0];
          break;
        case "last6months":
          const last6months = new Date(currentDate);
          last6months.setMonth(currentDate.getMonth() - 6);
          fromDate = new Date(
            last6months.getFullYear(),
            last6months.getMonth(),
            1
          )
            .toISOString()
            .split("T")[0];
          toDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          )
            .toISOString()
            .split("T")[0];
          break;
        // Add cases for other predefined date options
        default:
          break;
      }

      setfromdate(fromDate);
      settodate(toDate);
    }
  }, [dateOption]);

  return (
    <form
      className=" flex flex-wrap gap-6 mt-6 justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap gap-4 items-center">
        {/* from */}
        <input
          type="date"
          name="from"
          value={fromdate}
          onChange={(e) => setfromdate(e.target.value)}
          className="searchbar-input"
          placeholder="Pick a day"
          aria-label="Search"
        />

        <p className="hidden lg:flex">to</p>
        {/* to */}
        <input
          type="date"
          name="to"
          value={todate}
          onChange={(e) => settodate(e.target.value)}
          className="searchbar-input"
          placeholder="Pick a day"
          aria-label="Search"
        />
      </div>

      {/* dropdown */}
      <div className="flex flex-nowrap gap-4 items-center">
        <select
          value={dateOption}
          onChange={(e) => setDateOption(e.target.value)}
          className="  appearance-none border p-4 rounded-lg text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        >
          {dateOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white hover:bg-gray-200"
            >
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-primary border border-primary rounded-md shadow-xs px-7 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 relative"
          disabled={fromdate === "" || todate === "" || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Filtering" : "Filter"}
          {isLoading && (
            <span className="ml-2 inline-flex rounded-full border-t-2 border-gray-200 border-t-white animate-spin h-3 w-5"></span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CommodityDetail;
