import * as readline from "readline";
import { scrapeWikipedia, createWikipediaUrl } from "./src/scraper";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Asynchronously prompts the user to enter a Wikipedia article title and language code, generates a Wikipedia URL based on the input, scrapes the Wikipedia page content, displays the result, and closes the readline interface.
 *
 */
async function main() {
  rl.question("Enter the Wikipedia article title: ", async (title) => {
    rl.question(
      "Enter the language code (e.g., en, tr, fr, de): ",
      async (language) => {
        const url = createWikipediaUrl(title, language);
        const result = await scrapeWikipedia(url, language);
        console.log(result);
        rl.close();
      }
    );
  });
}

main();