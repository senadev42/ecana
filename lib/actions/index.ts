'use server'

import { scrapeCommodities } from "../scraper";

const ECXURL = 'https://www.ecx.com.et/Pages/Home.aspx'

export async function scrapeAndStoreCommodities() {

    try {

        const scrapedCommodities = scrapeCommodities(ECXURL);

    } catch (error: any) {
        throw new Error(`Failed to scrape: ${error.message}`)
    }
}