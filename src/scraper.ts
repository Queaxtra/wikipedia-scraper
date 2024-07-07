import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Scrapes the content of a Wikipedia page for a given URL and language.
 *
 * @param {string} url - The URL of the Wikipedia page to scrape.
 * @param {string} language - The language code of the Wikipedia page (e.g., en, tr, fr, de).
 * @return {Promise<string>} A promise that resolves to the scraped content as a string. If the content is not found, it returns a message indicating that. If an error occurs, it returns an error message.
 */
export async function scrapeWikipedia(
  url: string,
  language: string
): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const bodyContent = $("#bodyContent");

    if (bodyContent.length) {
      const paragraphs = bodyContent.find("p");
      const text = paragraphs
        .map((_, element) => $(element).text())
        .get()
        .join("\n\n");

      return text;
    } else {
      return `Content not found for ${language} Wikipedia.`;
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred.";
  }
}

/**
 * Creates a Wikipedia URL based on the given title and language.
 *
 * @param {string} title - The title of the Wikipedia page.
 * @param {string} language - The language code of the Wikipedia page (e.g., en, tr, fr, de).
 * @return {string} The URL of the Wikipedia page.
 */
export function createWikipediaUrl(title: string, language: string): string {
  return `https://${language}.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}
