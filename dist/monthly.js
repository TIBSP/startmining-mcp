const round = (value, decimals) => Math.round(value * 10 ** decimals) / 10 ** decimals;
const mean = (values) => values.reduce((sum, v) => sum + v, 0) / values.length;
/** First and last day (YYYY-MM-DD) of a calendar month given as YYYY-MM. */
export function monthRange(month) {
    const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(month);
    if (!match) {
        throw new Error("Invalid month. Use YYYY-MM (e.g. 2026-09)");
    }
    const year = Number(match[1]);
    const monthIndex = Number(match[2]);
    const days = new Date(Date.UTC(year, monthIndex, 0)).getUTCDate();
    return {
        from: `${month}-01`,
        to: `${month}-${String(days).padStart(2, "0")}`,
        days,
    };
}
/**
 * Calendar-month averages of the daily points. Refuses an incomplete month so a
 * monthly report never silently relies on fewer days than the month contains.
 */
export function computeMonthlyAverages(month, history) {
    const { from, to, days } = monthRange(month);
    const points = history.filter((p) => p.date >= from && p.date <= to);
    const uniqueDays = new Set(points.map((p) => p.date)).size;
    if (uniqueDays !== days) {
        throw new Error(`Incomplete month ${month}: ${uniqueDays}/${days} daily points available. ` +
            `Monthly averages require every day of the calendar month.`);
    }
    const hashpriceUsdPh = mean(points.map((p) => p.hashprice_usd_ph_day));
    // BTC hashprice per day = USD hashprice / BTC price of that same day
    const hashpriceBtcPh = mean(points.map((p) => p.hashprice_usd_ph_day / p.btc_price_usd));
    return {
        month,
        from,
        to,
        days,
        btc_price_usd: round(mean(points.map((p) => p.btc_price_usd)), 2),
        network_hashrate_eh: round(mean(points.map((p) => p.network_hashrate_eh)), 2),
        hashprice_usd_ph_day: round(hashpriceUsdPh, 2),
        hashprice_usd_th_day: round(hashpriceUsdPh / 1000, 5),
        hashprice_btc_ph_day: round(hashpriceBtcPh, 8),
        hashprice_sats_th_day: round((hashpriceBtcPh * 1e8) / 1000, 2),
        methodology: {
            period: "Full calendar month, UTC days",
            btc_price: "Arithmetic mean of daily prices (daily price = last price recorded on the UTC day, ~UTC close)",
            network_hashrate: "Arithmetic mean of daily network hashrate estimates",
            hashprice_usd: "Arithmetic mean of daily USD hashprice (block subsidy + ~2% fee approximation)",
            hashprice_btc: "Arithmetic mean of daily BTC hashprice (daily USD hashprice / daily BTC price)",
        },
    };
}
