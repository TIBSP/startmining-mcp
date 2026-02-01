#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE = process.env.STARTMINING_API_URL || "https://mining-api.startmining.io";
// Default public API key for MCP (rate limited, read-only)
const DEFAULT_PUBLIC_KEY = "sm_mcp_public_2026_xKj8mNpL4qRsT9wV2yHz";
const API_KEY = process.env.STARTMINING_API_KEY || DEFAULT_PUBLIC_KEY;
const MCP_VERSION = "1.0.4";

// Analytics tracking (fire-and-forget, non-blocking)
function trackToolCall(toolName: string): void {
  const payload = {
    tool: toolName,
    version: MCP_VERSION,
    ts: Date.now(),
  };
  
  fetch(`${API_BASE}/v1/mcp/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {}); // Silent fail, never blocks
}

interface MarketData {
  timestamp: string;
  btc: {
    price_usd: number;
    change_24h_pct: number;
    market_cap_usd: number;
    volume_24h_usd: number;
  };
  network: {
    difficulty: number;
    difficulty_formatted: string;
    hashrate_eh: number;
    block_height: number;
    blocks_until_adjustment: number;
  };
  mining: {
    hashprice_usd_ph_day: number;
    hashprice_btc_ph_day: number;
    block_subsidy: number;
    effective_reward: number;
    tx_fees_avg_btc: number;
    tx_fees_pct: number;
  };
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, { headers });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function postAPI<T>(endpoint: string, body: object): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Create MCP server
const server = new Server(
  {
    name: "startmining-mcp",
    version: MCP_VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_market_data",
      description: "Get current Bitcoin market and mining data including price, hashprice, difficulty, and network stats",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_hashprice",
      description: "Get current hashprice (mining revenue per PH/day) with detailed breakdown",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_difficulty",
      description: "Get current difficulty and next adjustment prediction",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_halving_info",
      description: "Get Bitcoin halving information - current era, next halving date, supply stats",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_price_history",
      description: "Get historical Bitcoin prices",
      inputSchema: {
        type: "object",
        properties: {
          from: {
            type: "string",
            description: "Start date (YYYY-MM-DD)",
          },
          to: {
            type: "string",
            description: "End date (YYYY-MM-DD)",
          },
          granularity: {
            type: "string",
            enum: ["daily", "weekly", "monthly"],
            description: "Data granularity (default: daily)",
          },
        },
        required: [],
      },
    },
    {
      name: "get_difficulty_history",
      description: "Get historical difficulty and hashrate data",
      inputSchema: {
        type: "object",
        properties: {
          from: {
            type: "string",
            description: "Start date (YYYY-MM-DD)",
          },
          to: {
            type: "string",
            description: "End date (YYYY-MM-DD)",
          },
        },
        required: [],
      },
    },
    {
      name: "calculate_profitability",
      description: "Calculate mining profitability for given hashrate and electricity cost",
      inputSchema: {
        type: "object",
        properties: {
          hashrate_th: {
            type: "number",
            description: "Hashrate in TH/s",
          },
          power_watts: {
            type: "number",
            description: "Power consumption in watts",
          },
          electricity_cost: {
            type: "number",
            description: "Electricity cost in $/kWh",
          },
          btc_price: {
            type: "number",
            description: "BTC price (optional, uses current if not provided)",
          },
          pool_fee_pct: {
            type: "number",
            description: "Pool fee percentage (default: 2)",
          },
          days: {
            type: "number",
            description: "Number of days to calculate (default: 30)",
          },
        },
        required: ["hashrate_th", "power_watts", "electricity_cost"],
      },
    },
    {
      name: "calculate_breakeven",
      description: "Calculate breakeven BTC price for mining operation",
      inputSchema: {
        type: "object",
        properties: {
          hashrate_th: {
            type: "number",
            description: "Hashrate in TH/s",
          },
          power_watts: {
            type: "number",
            description: "Power consumption in watts",
          },
          electricity_cost: {
            type: "number",
            description: "Electricity cost in $/kWh",
          },
        },
        required: ["hashrate_th", "power_watts", "electricity_cost"],
      },
    },
    {
      name: "get_mempool",
      description: "Get mempool status and fee estimates",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_recent_blocks",
      description: "Get recent Bitcoin blocks",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of blocks to return (default: 10)",
          },
        },
        required: [],
      },
    },
    {
      name: "get_asic_prices",
      description: "Get ASIC miner price data and efficiency stats",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  // Track usage (non-blocking)
  trackToolCall(name);

  try {
    switch (name) {
      case "get_market_data": {
        const data = await fetchAPI<MarketData>("/market/current");
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "get_hashprice": {
        const data = await fetchAPI("/calculator/hashprice");
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "get_difficulty": {
        const data = await fetchAPI("/market/difficulty");
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "get_halving_info": {
        const data = await fetchAPI("/market/halving");
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "get_price_history": {
        const params = new URLSearchParams();
        if (args?.from) params.set("from", String(args.from));
        if (args?.to) params.set("to", String(args.to));
        if (args?.granularity) params.set("granularity", String(args.granularity));
        const query = params.toString() ? `?${params}` : "";
        const data = await fetchAPI(`/price/history${query}`);
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "get_difficulty_history": {
        const params = new URLSearchParams();
        if (args?.from) params.set("from", String(args.from));
        if (args?.to) params.set("to", String(args.to));
        const query = params.toString() ? `?${params}` : "";
        const data = await fetchAPI(`/difficulty/history${query}`);
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "calculate_profitability": {
        const data = await postAPI("/calculator/profitability", {
          hashrate_th: args?.hashrate_th,
          power_watts: args?.power_watts,
          electricity_cost: args?.electricity_cost,
          btc_price: args?.btc_price,
          pool_fee_pct: args?.pool_fee_pct ?? 2,
          days: args?.days ?? 30,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "calculate_breakeven": {
        const params = new URLSearchParams({
          hashrate_th: String(args?.hashrate_th),
          power_watts: String(args?.power_watts),
          electricity_cost: String(args?.electricity_cost),
        });
        const data = await fetchAPI(`/calculator/breakeven?${params}`);
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "get_mempool": {
        const data = await fetchAPI("/network/mempool");
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "get_recent_blocks": {
        const limit = args?.limit ?? 10;
        const data = await fetchAPI(`/network/blocks?limit=${limit}`);
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      case "get_asic_prices": {
        const data = await fetchAPI("/asic-prices/stats");
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Startmining MCP server running on stdio");
}

main().catch(console.error);
