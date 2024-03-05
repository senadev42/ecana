"use client";

import { getCommodityData, scrapeAndStoreCommodities } from "@/lib/actions";
import { FormEvent, useEffect, useState } from "react";

import { useRouter } from 'next/navigation';

const Searchbar = () => {

  const CANON =  (new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

  const router = useRouter();

  // option data
  // [ ] move it out
  const dateOptions = [
    { value: "last7days", label: "Last 7 Days*" },
    { value: "lastMonth", label: "Last Month*" },
    { value: "custom", label: "Custom" },
  ];

  const commodityOptions = [
    { value: "coffee", label: "Coffee" }
  ];

  //tracking state
  const [isLoading, setIsLoading] = useState(false);

  const [fromdate, setfromdate] = useState(CANON);
  const [todate, settodate] = useState(CANON);

  const [dateOption, setDateOption] = useState("last7days");
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
      
      //setIsLoading(false);
    }
  };

  function handleDateDropdown(selecteddateoption: string) {
    setDateOption(selecteddateoption);
    
    if (selecteddateoption === "custom") {
      setfromdate("");
      settodate("");
    } else {
      // Update fromdate and todate based on selected dateOption
      const currentDate = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000);
      let fromDate = "";
      let toDate = "";

      switch (selecteddateoption) {
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
        default:
          break;
      }

      setfromdate(fromDate);
      settodate(toDate);
    }
  }



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
          max={CANON}
        />

        <p className="hidden lg:flex">to</p>
        {/* to */}
        <input
          type="date"
          name="to"
          value={todate}
          onChange={(e) => {settodate(e.target.value); setDateOption('custom');}}
          className="searchbar-input"
          placeholder="Pick a day"
          aria-label="Search"
          max={CANON}
        />
      </div>

      {/* dropdown */}
      <div className="flex flex-nowrap gap-4 items-center">
      <select
          value={dateOption}
          onChange={(e) => handleDateDropdown(e.target.value)}
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
