import axios from "axios";

import * as cheerio from "cheerio";

//getting out redirect hell
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export async function scrapeCommodities(url: string) {
  if (!url) return;

  //getting around the redirect issues
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  
  //optional proxying if the site throws a fit

  try {
    const response = await client.get(url);
    const $ = cheerio.load(response.data);

    const date = $("#MainContent_lblCoffee").text().trim();

    const coffeeData: any[] = [];

    $("#MainContent_gvCoffee tr:gt(0)").each((index, element) => {
      const columns = $(element).find("td");

      const coffeeInfo = {
        symbol: columns.eq(0).text().trim(),
        warehouseCode: columns.eq(1).text().trim(),
        productionYear: columns.eq(2).text().trim(),
        prevClose: columns.eq(3).text().trim(),
        close: columns.eq(4).text().trim(),
        change: columns.eq(5).text().trim(),
        high: columns.eq(6).text().trim(),
        low: columns.eq(7).text().trim(),
        volume: columns.eq(8).text().trim(),
      };

      coffeeData.push(coffeeInfo);
    });
    



    const result = {
      date: date,
      coffeeData: coffeeData,
    };

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
