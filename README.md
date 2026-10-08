# @startminingmcp/mcp

MCP (Model Context Protocol) server for Bitcoin mining data. Get real-time hashprice, difficulty, profitability calculations, and more.

## 🚀 Features

- **Real-time market data** — BTC price, hashprice, difficulty, network stats
- **Profitability calculator** — Calculate ROI for any ASIC setup
- **Historical data** — Price and difficulty history since 2009
- **Halving tracker** — Current era, next halving, supply stats
- **Mempool & blocks** — Fee estimates and recent blocks
- **ASIC prices** — Market prices by efficiency tier

## 📦 Installation

```bash
npm install -g @startminingmcp/mcp
```

Or use directly with npx:

```bash
npx @startminingmcp/mcp
```

## ⚙️ Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "startmining": {
      "command": "npx",
      "args": ["@startminingmcp/mcp"]
    }
  }
}
```

### With API Key (optional, for higher rate limits)

```json
{
  "mcpServers": {
    "startmining": {
      "command": "npx",
      "args": ["@startminingmcp/mcp"],
      "env": {
        "STARTMINING_API_KEY": "your_api_key"
      }
    }
  }
}
```

## 🛠️ Available Tools

| Tool | Description |
|------|-------------|
| `get_market_data` | Current BTC price, hashprice, difficulty, network stats |
| `get_hashprice` | Hashprice breakdown ($/PH/day) |
| `get_difficulty` | Current difficulty + next adjustment prediction |
| `get_halving_info` | Halving era, next date, supply stats |
| `get_price_history` | Historical BTC prices (from, to, granularity) |
| `get_difficulty_history` | Historical difficulty & hashrate |
| `get_monthly_averages` | Calendar-month averages (UTC) of BTC price, hashrate, hashprice USD & BTC (month: YYYY-MM) |
| `get_weekly_stats` | Closed ISO-week stats (UTC): block time, real fees, implied hashrate, real hashprice BTC & USD, difficulty adjustments, daily rows (default: last 2 weeks) |
| `calculate_profitability` | Mining profitability for given setup |
| `calculate_breakeven` | Breakeven BTC price |
| `get_mempool` | Mempool status & fee estimates |
| `get_recent_blocks` | Recent blocks info (max 50) |
| `get_asic_prices` | ASIC market prices by efficiency |

## 💡 Example Queries

Once configured, you can ask Claude:

- "What's the current hashprice?"
- "Calculate profitability for an S21 (200 TH/s, 3500W) at $0.05/kWh"
- "When is the next halving?"
- "Show me BTC price history for last month"
- "What's the mempool fee situation?"
- "Give me the September 2026 monthly averages for price, hashrate and hashprice"
- "Compare the last two closed weeks: block time, fees and hashprice"

## 📊 Data Sources

- **Price data**: Internal database (since 2009-01-03)
- **Network data**: Direct Bitcoin Core node
- **Calculations**: Real-time based on current conditions

## 🔗 Links

- **Website**: [pro.startmining.io](https://pro.startmining.io)
- **Company**: [startmining.io](https://startmining.io)
- **API Docs**: [mining-api.startmining.io](https://mining-api.startmining.io)

## 📄 License

MIT © [Startmining](https://startmining.io)
