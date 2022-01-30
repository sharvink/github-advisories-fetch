// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://github.com/advisories?query=type%3Areviewed+ecosystem%3Anpm";

// Async function which scrapes the data
async function getAdvisories() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $(".Box-row .lh-condensed a");
    //console.log(listItems);
    // Stores data for all countries
    const links = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      links.push($(el).attr('href'));
    });

    for (let index = 0; index < links.length; index++) {
        const element = await fetchPackageDetails('https://github.com'+ links[index]);
        
    }

  } catch (err) {
    console.error(err);
  }
}
async function fetchPackageDetails(url){
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        // Select all the list items in plainlist class

        let severity = $("#js-pjax-container > div > div.Subhead.border-bottom-0.mt-3.mt-lg-4.mb-0 > div > span.Label.text-bold.mr-1.v-align-middle");
        
        console.log("URL:",url );
        console.log("Severity:", severity.attr('title'));

        const elem = $("#js-pjax-container > div > div.gutter-lg.gutter-condensed.clearfix > div.col-12.col-md-9.float-left > div:nth-child(1) > div > div > div.float-left");


        const elem2 = $("#js-pjax-container > div > div.gutter-lg.gutter-condensed.clearfix > div.col-12.col-md-9.float-left > div:nth-child(1) > div > div > div:nth-child(2)");

        const elem3 = $("#js-pjax-container > div > div.gutter-lg.gutter-condensed.clearfix > div.col-12.col-md-9.float-left > div:nth-child(1) > div > div > div:nth-child(3)");
        


        console.log("Package Name:",$(elem).find('span.f4.color-fg-default.text-bold').html())//
        console.log("Package Manager:",$(elem).find('span.color-fg-muted.f4').html())
        
        
        console.log("Affected Version:",$(elem2).find('div').text());

        console.log("Patched Version:",$(elem3).find('div').text())


        const listItems = $(".Box-row .lh-condensed a");
        return;

}
// Invoke the above function
getAdvisories();