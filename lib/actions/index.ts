"use server";

import { revalidatePath } from "next/cache";

import DailyRecord from "../models/metric.model";
import { connectToDB } from "../mongoose";
import { scrapeCommodities } from "../scraper";

const ECXURL = "https://www.ecx.com.et/Pages/Home.aspx";

export async function scrapeAndStoreCommodities() {
  try {
    //connect to mongo
    await connectToDB();

    //scrape
    let scrapedCommodities = await scrapeCommodities(ECXURL);
    if (!scrapedCommodities) {
      throw new Error("Failed to scrape commodities");
    }

    console.log(scrapedCommodities);

    //store
    console.log("Trying to save...");
    await DailyRecord.findOneAndUpdate(
      {
        recordID: scrapedCommodities.recordID,
      },
      scrapedCommodities,
      { upsert: true, new: true }
    );
    console.log("Saved");

    // revalidatePath(`/commodity/${scrapedCommodities.type}`);

  } catch (error: any) {
    throw new Error(`Failed to scrape: ${error.message}`);
  }
}

export async function getCommodityData(type: string) {
  try {
    //connect to mongo
    await connectToDB();

    console.log(`Fetching commodity: ${type}`);
    //get data
    let commodityData = await DailyRecord.find({ type }).lean().exec();

    if (!commodityData) {
      return null;
    }

    commodityData = commodityData.map((commodity) => {
      delete commodity._id;
      delete commodity.__v;
      delete commodity.createdAt;
      delete commodity.updatedAt;
      return commodity;
    });

    // console.log(commodityData);

    console.log("Done fetching")

    return JSON.parse(JSON.stringify(commodityData));
  } catch (error: any) {
    throw new Error(`Failed to get data: ${error.message}`);
  }
}
