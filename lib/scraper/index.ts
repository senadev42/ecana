import axios from "axios";

import * as cheerio from "cheerio";

//getting out redirect hell
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { SingleEntry } from "@/types";

export async function scrapeCommodities(url: string) {
  if (!url) return;

  console.log(new Date().toISOString(), " Starting scraping...");
  //getting around the redirect issues
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));

  //optional proxying if the site throws a fit

  try {
    const response = await client.get(url);
    const $ = cheerio.load(response.data);

    const type = "coffee";
    const date = $("#MainContent_lblCoffee").text().trim();
    const transformedDate = new Date(date).toISOString().split("T")[0];

    //coffee
    const coffeeData: SingleEntry[] = [];
    $("#MainContent_gvCoffee tr:gt(0)").each((index, element) => {
      const columns = $(element).find("td");

      const coffeeInfo = {
        symbol: columns.eq(0).text().trim(),
        warehouseCode: columns.eq(1).text().trim(),
        productionYear: columns.eq(2).text().trim(),
        prevClose: Number(columns.eq(3).text().trim()),
        close: Number(columns.eq(4).text().trim()),
        change: Number(columns.eq(5).text().trim()),
        high: Number(columns.eq(6).text().trim()),
        low: Number(columns.eq(7).text().trim()),
        volume: Number(columns.eq(8).text().trim()),
      };

      coffeeData.push(coffeeInfo);
    });

    //the other commodities once this passes the proof of concept stage

    const result = {
      type: type,
      data: coffeeData,
      date: transformedDate,
      recordID: `${type}${transformedDate}`
    };

    console.log(new Date().toISOString(), " Done Scraping");
    return result;
  } catch (error) {
    console.log(error);
  }
}
