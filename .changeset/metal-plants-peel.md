---
"@cloudflare/kumo": major
---

add xAxisTickLabelFormat and tooltipValueFormat props to TimeseriesChart; use yAxisTickLabelFormat for y-axis ticks instead of tooltip values

**Breaking:** `yAxisTickLabelFormat` no longer formats tooltip values. It now formats y-axis tick labels (matching its name). If you were using it to customize tooltip output, switch to `tooltipValueFormat`.

Before:

```tsx
<TimeseriesChart yAxisTickLabelFormat={(v) => `${v} req/s`} />
```

After:

```tsx
<TimeseriesChart tooltipValueFormat={(v) => `${v} req/s`} />
```
