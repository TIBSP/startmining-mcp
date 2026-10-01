export interface HashpriceHistoryPoint {
    date: string;
    hashprice_usd_ph_day: number;
    btc_price_usd: number;
    network_hashrate_eh: number;
}
export interface MonthlyAverages {
    month: string;
    from: string;
    to: string;
    days: number;
    btc_price_usd: number;
    network_hashrate_eh: number;
    hashprice_usd_ph_day: number;
    hashprice_usd_th_day: number;
    hashprice_btc_ph_day: number;
    hashprice_sats_th_day: number;
    methodology: Record<string, string>;
}
/** First and last day (YYYY-MM-DD) of a calendar month given as YYYY-MM. */
export declare function monthRange(month: string): {
    from: string;
    to: string;
    days: number;
};
/**
 * Calendar-month averages of the daily points. Refuses an incomplete month so a
 * monthly report never silently relies on fewer days than the month contains.
 */
export declare function computeMonthlyAverages(month: string, history: HashpriceHistoryPoint[]): MonthlyAverages;
