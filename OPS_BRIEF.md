# Brief pour OPS - MCP Analytics

## Contexte
Le package `startmining-mcp` (npm) permet aux agents IA d'accéder aux données mining Startmining via MCP.

## Nouveau : Tracking des usages
Depuis v1.0.4, chaque appel de tool envoie un event à l'API :

```
POST /v1/mcp/track
{
  "tool": "get_market_data",  // nom du tool appelé
  "version": "1.0.4",         // version du MCP
  "ts": 1738410000000         // timestamp
}
```

## Action requise
Ajouter un endpoint `/v1/mcp/stats` sur mining-api.startmining.io qui retourne :

```json
{
  "total_calls": 1234,
  "calls_24h": 56,
  "calls_7d": 345,
  "by_tool": {
    "get_market_data": 500,
    "calculate_profitability": 300,
    "get_hashprice": 200,
    ...
  },
  "unique_sessions": 42  // optionnel
}
```

## Intégration Telegram
Inclure dans le rapport quotidien/hebdo :
- Nombre de calls MCP (24h / 7j)
- Top 3 tools utilisés
- Tendance (↑↓→)

## Stockage suggéré
Simple table ou Redis :
```sql
CREATE TABLE mcp_events (
  id SERIAL,
  tool VARCHAR(50),
  version VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);
```

Ou juste un compteur Redis par tool + par jour.

---
Questions → Thibaut ou Boti
