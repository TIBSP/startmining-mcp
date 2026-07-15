# Marketplace Submissions for startmining-mcp

## 1. GitHub Topics (à ajouter au repo)

```
mcp, model-context-protocol, bitcoin, bitcoin-mining, cryptocurrency, hashprice, ai, claude, anthropic
```

---

## 2. mcp.so

**URL**: https://mcp.so/submit (ou via GitHub PR)

**Listing Info:**
- **Name**: Startmining MCP Server
- **Package**: `startmining-mcp`
- **Category**: Finance / Cryptocurrency
- **Description**: 

> Real-time Bitcoin mining data for AI assistants. Get hashprice, difficulty, profitability calculations, halving info, and more. Built by Startmining, a professional Bitcoin mining company.

**Features to highlight:**
- Real-time hashprice ($/PH/day) and network stats
- Mining profitability calculator for any ASIC setup
- Historical price and difficulty data since 2009
- Halving tracker and supply stats
- Mempool fees and recent blocks
- ASIC market prices by efficiency tier

**Install:**
```bash
npx startmining-mcp
```

---

## 3. Smithery.ai

**URL**: https://smithery.ai/submit

**Listing:**
- **Name**: startmining-mcp
- **One-liner**: Bitcoin mining data & profitability calculations for AI
- **Category**: Cryptocurrency / Finance
- **Author**: Startmining
- **Website**: https://pro.startmining.io

**Description:**
> Professional Bitcoin mining data server. Query real-time hashprice, calculate ASIC profitability, track difficulty adjustments, and access historical data back to 2009. Built by Startmining, operating mining infrastructure across Europe.

**Tools (11):**
1. `get_market_data` - BTC price, hashprice, difficulty, network stats
2. `get_hashprice` - Detailed hashprice breakdown
3. `get_difficulty` - Current + next adjustment prediction
4. `get_halving_info` - Era, next date, supply stats
5. `get_price_history` - Historical BTC prices
6. `get_difficulty_history` - Historical difficulty & hashrate
7. `calculate_profitability` - Mining ROI calculator
8. `calculate_breakeven` - Breakeven BTC price
9. `get_mempool` - Fees and mempool status
10. `get_recent_blocks` - Recent blocks info
11. `get_asic_prices` - Market prices by efficiency

---

## 4. Awesome MCP Servers (GitHub PR)

**Repo**: https://github.com/punkpeye/awesome-mcp-servers

**PR Addition** (in Finance section):
```markdown
- [startmining-mcp](https://github.com/TIBSP/startmining-mcp) - Bitcoin mining data: hashprice, difficulty, profitability calculations, halving info. Real-time data from professional mining infrastructure.
```

---

## 5. Anthropic Official List

**Repo**: https://github.com/modelcontextprotocol/servers

**More selective** - requires quality bar. Submit after:
- [ ] Public GitHub repo with good README
- [ ] npm package stable (no breaking changes)
- [ ] Some community usage/stars

**PR Addition** (in Community Servers):
```markdown
### Startmining MCP
Bitcoin mining data and profitability calculations. Real-time hashprice, difficulty, network stats, and ASIC ROI calculator.
- npm: `startmining-mcp`
- GitHub: https://github.com/TIBSP/startmining-mcp
```

---

## Status (mis à jour 2026-07-15)

| Platform | Status | Action Required |
|----------|--------|-----------------|
| npm | ✅ v1.0.4 publiée ; v1.0.5 prête (ajout `mcpName`) | `npm publish` (login Thibaut) |
| GitHub | ✅ https://github.com/TIBSP/startmining-mcp | — |
| **MCP Registry officiel** | 🔴 Pas listé — `server.json` prêt dans le repo | `mcp-publisher login github` puis `mcp-publisher publish` (après npm publish) |
| Glama | 🔴 Pas listé — Dockerfile + glama.json + release prêts | Soumettre https://github.com/TIBSP/startmining-mcp sur https://glama.ai/mcp/servers (login) |
| Awesome MCP Servers | ❌ PR #1789 fermée (inactivité). Exigences : listing Glama d'abord + badge glama dans l'entrée + pas de lien site dans la description | Re-PR après Glama (CC peut la faire via gh) |
| mcp.so | ⏳ Needs login | Thibaut (textes §2 ci-dessus) |
| Smithery | ⏳ Needs login | Thibaut (textes §3 ci-dessus) |
| PulseMCP & co | — | Synchronisent depuis le registry officiel → couverts par la ligne 3 |
| Anthropic Official | ⏳ Later | After traction |

---

## Runbook 2026-07-15 (ordre exact)

1. **Thibaut** : `cd E:\startmining-mcp && npm login && npm publish` (publie v1.0.5 avec le champ `mcpName` requis par le registry).
2. **Thibaut** : `mcp-publisher login github` (device flow) puis `mcp-publisher publish` depuis `E:\startmining-mcp` (installe via `brew`/binaire GitHub releases `modelcontextprotocol/registry` si absent).
3. **Thibaut** : soumettre le repo sur https://glama.ai/mcp/servers (l'image Docker et la release v1.0.5 sont les checks qu'ils exécutent).
4. **CC** : une fois l'URL Glama live (`https://glama.ai/mcp/servers/TIBSP/startmining-mcp`), re-PR awesome-mcp-servers, section Finance & Fintech, format :
   ```markdown
   - [TIBSP/startmining-mcp](https://github.com/TIBSP/startmining-mcp) [![TIBSP/startmining-mcp MCP server](https://glama.ai/mcp/servers/TIBSP/startmining-mcp/badges/score.svg)](https://glama.ai/mcp/servers/TIBSP/startmining-mcp) 📇 ☁️ - Bitcoin mining data from a self-hosted Bitcoin Core node: hashprice, difficulty, halving countdown, mempool, ASIC profitability and breakeven calculators, historical series since 2009. 11 tools, no API key.
   ```
5. **Thibaut** (optionnel, 2 min chacun) : mcp.so + Smithery avec les textes des §2-3.
