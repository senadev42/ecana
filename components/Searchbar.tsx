"use client";

import { getCommodityData, scrapeAndStoreCommodities } from "@/lib/actions";
import { FormEvent, useEffect, useState } from "react";

import { useRouter } from 'next/navigation';

const Searchbar = () => {

  const router = useRouter();

  // option data
  // [ ] move it out
  const dateOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "lastMonth", label: "Last Month" },
    { value: "custom", label: "Custom" },
  ];

  const commodityOptions = [
    { value: "coffee", label: "Coffee" }
  ];

  //tracking state
  const [isLoading, setIsLoading] = useState(false);

  const [fromdate, setfromdate] = useState(new Date().toISOString().split("T")[0]);
  const [todate, settodate] = useState(new Date().toISOString().split("T")[0]);

  const [dateOption, setDateOption] = useState("today");
  const [commodityOption, setCommodityOption] = useState("coffee");


  // handlers
  const handleSubmit = async (event: FormEvent) => {
   

    event.preventDefault();

    if (!fromdate || !todate) return;

  

    try {
      setIsLoading(true);

      //await scrapeAndStoreCommodities();
      // let res = await getCommodityData("coffee");
      // console.log(res);

      // console.log("Trying to route");
      // console.log(fromdate, todate, commodityOption);
      //  router.push(`/commodities/${commodityOption}?fromdate=${fromdate}&todate=${todate}`);

       router.push(`/commodities/${commodityOption}`);
      
      
    } catch (error) {
      console.log(error);
    } finally {
      
      setIsLoading(false);
    }
  };

  // date magic
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
    <form className="flex flex-wrap gap-6 mt-6" onSubmit={handleSubmit}>
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


        <select
          value={commodityOption}
          onChange={(e) => setCommodityOption(e.target.value)}
          className=" appearance-none border p-4 rounded-lg text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        >
          {commodityOptions.map((option) => (
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
          className="searchbar-btn relative"
          disabled={fromdate === "" || todate === "" || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Fetching' : 'Fetch'}
          {isLoading && (
            <span className="ml-2 inline-flex rounded-full border-t-2 border-gray-200 border-t-white animate-spin h-4 w-4"></span>
          )}
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
