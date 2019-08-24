const siteUrl = "https://www.se-ed.com/product/book.aspx?no=9786162872655";
import axios from "axios"
const cheerio = require("cheerio");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  const data = cheerio.load(result.data);
  return data;
};

export default async () => {
  const $ = await fetchData();
  const name = $('h1.book-title').text()
  const detail = $('.book-detail-box > .box').first().text()
  const author = $('td.book-author-list a').eq(0).text()
  const translator = $('td.book-author-list a').eq(1).text()
  const cover = $("meta[itemprop='image']").attr('content')
  const length = $('.book-detail-box').eq('3').find('.detail-table td.right').eq(0).text().match(/([0-9])\w+/g)[1]
  const publisher = $('.book-detail-box').eq('3').find('.detail-table td.right').eq(5).text().slice(1).trim()
  const price = $('.price-box').eq(0).find('.price-display').text().match(/[+-]?([0-9]*[.])?[0-9]+/g)[0]
  return { name, detail, author, cover, translator, length, publisher, price }
}