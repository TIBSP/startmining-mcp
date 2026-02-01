# @startmining/mcp-server

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
npm install -g @startmining/mcp-server
```

Or use directly with npx:

```bash
npx @startmining/mcp-server
```

## ⚙️ Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "startmining": {
      "command": "npx",
      "args": ["@startmining/mcp-server"]
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
      "args": ["@startmining/mcp-server"],
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
| `calculate_profitability` | Mining profitability for given setup |
| `calculate_breakeven` | Breakeven BTC price |
| `get_mempool` | Mempool status & fee estimates |
| `get_recent_blocks` | Recent blocks info |
| `get_asic_prices` | ASIC market prices by efficiency |

## 💡 Example Queries

Once configured, you can ask Claude:

- "What's the current hashprice?"
- "Calculate profitability for an S21 (200 TH/s, 3500W) at $0.05/kWh"
- "When is the next halving?"
- "Show me BTC price history for last month"
- "What's the mempool fee situation?"

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
