---
"@cloudflare/kumo": minor
---

add xAxisTickFormat, yAxisTickFormat, and tooltipValueFormat props to TimeseriesChart; deprecate yAxisTickLabelFormat

## Deprecation: yAxisTickLabelFormat is deprecated

If you were using `yAxisTickLabelFormat` to customize tooltip output, switch to `tooltipValueFormat`.

**Before:**

```tsx
<TimeseriesChart yAxisTickLabelFormat={(v) => `${v} req/s`} />
```

**After:**

```tsx
<TimeseriesChart tooltipValueFormat={(v) => `${v} req/s`} />
```
