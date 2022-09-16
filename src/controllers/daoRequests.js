const axios = require("axios");
const { convertDate, float } = require("../utils/timeUtils");

class criptoApi {
  constructor(coin = undefined) {
    this._endpoint =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
    this._coin = coin;
    this.coinData = null;
  }

  get endpoint() {
    return this._endpoint;
  }

  get coin() {
    return this._coin.toLowerCase();
  }

  set coin(newCoin) {
    this._coin = newCoin;
  }

  async getCoinData() {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list",
      {
        cache: {
          maxAge: 2 * 60 * 500,
        },
      }
    );
    return data.filter((filterCoin) => filterCoin.symbol === this.coin);
  }

  async requestTickerCoin() {
    try {
      const coinData = await this.getCoinData();
      this.coinData = coinData[0];
      const response = await axios.get(this.endpoint + this.coinData.id);
      return response.data;
    } catch (err) {
      console.log(err);

      return err;
    }
  }

  async renderCoin() {
    const data = await this.requestTickerCoin();
    let date = convertDate();
    let {
      high_24h = 0,
      low_24h = 0,
      current_price = 0,
      market_cap = 0,
      total_volume = 0,
      price_change_percentage_24h = 0,
      market_cap_rank = 0
    } = data[0];

    console.log("🚀 ~ file: daoRequests.js ~ line 59 ~ criptoApi ~ renderCoin ~ price_change_percentage_24h", price_change_percentage_24h)
    let NOT_FOUND_TEXT = 'Not Found'

    //if (high_24h < 1) high_24h = high_24h.toFixed(3)
    //if (low_24h < 1) low_24h = low_24h.toFixed(3)
    //if (current_price < 1) current_price = current_price.toFixed(3)
    if (market_cap < 1) market_cap = market_cap.toFixed(3)
    if (total_volume < 1) total_volume = total_volume.toFixed(3)
    if (price_change_percentage_24h < 1) price_change_percentage_24h = price_change_percentage_24h.toFixed(3)


    high_24h = (high_24h && high_24h > 1000) ? `${this.formatMoney(parseInt(high_24h))}` : `${high_24h}`;
    low_24h = (low_24h && low_24h > 1000) ? `${this.formatMoney(parseInt(low_24h))}` : `${low_24h}`;
    current_price = (current_price && current_price > 1000) ? `${this.formatMoney(parseInt(current_price))}` : `${current_price}`;
    market_cap = (market_cap && market_cap > 1000) ? `${this.formatMoney(parseInt(market_cap))}` : `${market_cap}`;
    total_volume = (total_volume && total_volume > 1000) ? `${this.formatMoney(parseInt(total_volume))}` : `${total_volume}`;
    market_cap_rank = (market_cap_rank && market_cap_rank > 1000) ? `${this.formatMoney(parseInt(market_cap_rank))}` : `${market_cap_rank}`;
    
    let textOperation = `
  \n<a href="https://t.me/CoinTalkGroupChat"><b>${this.coinData.symbol.toUpperCase()} | ${this.coinData.name}</b></a> <code>[${market_cap_rank}]</code>
<code>${date}</code>
Price : <b>$${current_price}</b>
High: <b>$${high_24h}</b> 
Low : <b>$${low_24h}</b>
24h: <b>${price_change_percentage_24h}%</b>
Volume: <b>$${total_volume}</b>
Market Cap: <b>$${market_cap}</b>
  `;
    return textOperation;
  }

  formatMoney(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }


}

module.exports = criptoApi;
