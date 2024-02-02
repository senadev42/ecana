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

    //store
    console.log("Trying to save...");
    const newdailyEntry = await DailyRecord.findOneAndUpdate(
      {
        recordID: scrapedCommodities.recordID,
      },
      scrapedCommodities,
      { upsert: true, new: true }
    );

    console.log("Saved");

    // revalidatePath(`/commodity/${scrapedCommodities.type}`);

    return scrapedCommodities;

    //store
    //const existingdailyEntry =
  } catch (error: any) {
    throw new Error(`Failed to scrape: ${error.message}`);
  }
}
