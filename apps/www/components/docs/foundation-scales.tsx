import { ColorScale } from "./color-scale";

const brand = [
  ["50", "#EFF3FE"],
  ["100", "#E0E7FD"],
  ["200", "#C6D3FB"],
  ["300", "#A3B6F8"],
  ["400", "#7D93F2"],
  ["500", "#5C74EB"],
  ["600", "#4658DE"],
  ["700", "#3A46C4"],
  ["800", "#313B9E"],
  ["900", "#2E377D"],
  ["950", "#1C2049"],
].map(([step, hex]) => ({
  step,
  hex,
  token: `brand/${step}`,
}));

const gray = [
  ["50", "#F9FAFB"],
  ["100", "#F2F4F7"],
  ["200", "#E4E7EC"],
  ["300", "#D0D5DD"],
  ["400", "#98A2B3"],
  ["500", "#667085"],
  ["600", "#475467"],
  ["700", "#344054"],
  ["800", "#1D2939"],
  ["900", "#101828"],
  ["950", "#0C111D"],
].map(([step, hex]) => ({
  step,
  hex,
  token: `gray/${step}`,
}));

const error = [
  ["50", "#FEF3F2"],
  ["100", "#FEE4E2"],
  ["200", "#FECDCA"],
  ["300", "#FDA29B"],
  ["400", "#F97066"],
  ["500", "#F04438"],
  ["600", "#D92D20"],
  ["700", "#B42318"],
  ["800", "#912018"],
  ["900", "#7A271A"],
  ["950", "#55160C"],
].map(([step, hex]) => ({
  step,
  hex,
  token: `error/${step}`,
}));

const warning = [
  ["50", "#FFFAEB"],
  ["100", "#FEF0C7"],
  ["200", "#FEDF89"],
  ["300", "#FEC84B"],
  ["400", "#FDB022"],
  ["500", "#F79009"],
  ["600", "#DC6803"],
  ["700", "#B54708"],
  ["800", "#93370D"],
  ["900", "#7A2E0E"],
  ["950", "#4E1D09"],
].map(([step, hex]) => ({
  step,
  hex,
  token: `warning/${step}`,
}));

const success = [
  ["50", "#ECFDF3"],
  ["100", "#D1FADF"],
  ["200", "#A6F4C5"],
  ["300", "#6CE9A6"],
  ["400", "#32D583"],
  ["500", "#12B76A"],
  ["600", "#079455"],
  ["700", "#067647"],
  ["800", "#085D3A"],
  ["900", "#074D31"],
  ["950", "#053321"],
].map(([step, hex]) => ({
  step,
  hex,
  token: `success/${step}`,
}));

export function BrandScale() {
  return (
    <ColorScale
      name="Brand"
      description="Modern indigo-leaning blue. brand/600 is the primary brand color."
      swatches={brand}
    />
  );
}

export function GrayScale() {
  return (
    <ColorScale
      name="Gray"
      description="Neutral scale with a slight cool bias to harmonize with brand blue."
      swatches={gray}
    />
  );
}

export function ErrorScale() {
  return (
    <ColorScale
      name="Error"
      description="Red scale for destructive actions, errors, and critical alerts."
      swatches={error}
    />
  );
}

export function WarningScale() {
  return (
    <ColorScale
      name="Warning"
      description="Amber scale for cautionary states and non-blocking alerts."
      swatches={warning}
    />
  );
}

export function SuccessScale() {
  return (
    <ColorScale
      name="Success"
      description="Green scale for confirmation, completion, and positive feedback."
      swatches={success}
    />
  );
}

const typeScale = [
  { name: "ui-xs", size: "12px", lineHeight: "16px", weight: "Medium", className: "text-ui-xs font-medium" },
  { name: "ui-sm", size: "13px", lineHeight: "18px", weight: "Medium", className: "text-ui-sm font-medium" },
  { name: "ui-md", size: "14px", lineHeight: "20px", weight: "Medium", className: "text-ui-md font-medium" },
  { name: "ui-lg", size: "16px", lineHeight: "24px", weight: "Medium", className: "text-ui-lg font-medium" },
  { name: "body-sm", size: "14px", lineHeight: "22px", weight: "Regular", className: "text-body-sm font-normal" },
  { name: "body-md", size: "16px", lineHeight: "26px", weight: "Regular", className: "text-body-md font-normal" },
  { name: "body-lg", size: "18px", lineHeight: "28px", weight: "Regular", className: "text-body-lg font-normal" },
  { name: "display-xs", size: "24px", lineHeight: "32px", weight: "Semibold", className: "text-display-xs font-semibold" },
  { name: "display-sm", size: "30px", lineHeight: "38px", weight: "Semibold", className: "text-display-sm font-semibold" },
  { name: "display-md", size: "36px", lineHeight: "44px", weight: "Semibold", className: "text-display-md font-semibold" },
  { name: "display-lg", size: "48px", lineHeight: "58px", weight: "Semibold", className: "text-display-lg font-semibold" },
  { name: "display-xl", size: "60px", lineHeight: "72px", weight: "Semibold", className: "text-display-xl font-semibold" },
  { name: "display-2xl", size: "72px", lineHeight: "88px", weight: "Semibold", className: "text-display-2xl font-semibold" },
] as const;

export function TypeScale() {
  return (
    <div className="not-prose my-6 divide-y divide-border-default rounded-lg border border-border-default">
      {typeScale.map((row) => (
        <div key={row.name} className="flex items-baseline gap-6 p-4">
          <div className="w-32 shrink-0 font-mono text-ui-xs text-fg-tertiary">
            <p className="text-fg-primary">{row.name}</p>
            <p>
              {row.size} / {row.lineHeight}
            </p>
            <p>{row.weight}</p>
          </div>
          <p className={`${row.className} truncate text-fg-primary`}>Asteria UI</p>
        </div>
      ))}
    </div>
  );
}

const spacingScale = [
  ["px", "1px"],
  ["2xs", "2px"],
  ["xs", "4px"],
  ["sm", "6px"],
  ["md", "8px"],
  ["lg", "12px"],
  ["xl", "16px"],
  ["2xl", "20px"],
  ["3xl", "24px"],
  ["4xl", "32px"],
  ["5xl", "40px"],
  ["6xl", "48px"],
  ["7xl", "64px"],
  ["8xl", "80px"],
  ["9xl", "96px"],
  ["10xl", "128px"],
] as const;

export function SpacingScale() {
  return (
    <div className="not-prose my-6 space-y-2">
      {spacingScale.map(([step, px]) => (
        <div key={step} className="flex items-center gap-4">
          <div className="w-20 shrink-0 font-mono text-ui-xs text-fg-tertiary">space-{step}</div>
          <div className="h-3 rounded-xs bg-bg-brand-solid" style={{ width: px }} />
          <div className="font-mono text-ui-xs text-fg-tertiary">{px}</div>
        </div>
      ))}
    </div>
  );
}

const radiusScale = [
  ["xs", "6px"],
  ["sm", "8px"],
  ["md", "10px"],
  ["lg", "14px"],
  ["xl", "20px"],
  ["full", "9999px"],
] as const;

export function RadiusScale() {
  return (
    <div className="not-prose my-6 flex flex-wrap gap-6">
      {radiusScale.map(([step, px]) => (
        <div key={step} className="flex flex-col items-center gap-2">
          <div
            className="size-16 border border-border-brand bg-bg-brand-subtle"
            style={{ borderRadius: px }}
          />
          <p className="font-mono text-ui-xs text-fg-tertiary">
            radius-{step} · {px}
          </p>
        </div>
      ))}
    </div>
  );
}

const shadowScale = [
  ["xs", "0 1px 2px rgb(46 55 125 / 0.06)"],
  ["sm", "0 1px 3px rgb(46 55 125 / 0.1), 0 1px 2px rgb(46 55 125 / 0.06)"],
  ["md", "0 4px 6px -1px rgb(46 55 125 / 0.1), 0 2px 4px -2px rgb(46 55 125 / 0.06)"],
  ["lg", "0 10px 15px -3px rgb(46 55 125 / 0.1), 0 4px 6px -4px rgb(46 55 125 / 0.05)"],
  ["xl", "0 20px 25px -5px rgb(46 55 125 / 0.1), 0 8px 10px -6px rgb(46 55 125 / 0.05)"],
  ["2xl", "0 25px 50px -12px rgb(46 55 125 / 0.22)"],
] as const;

export function ShadowScale() {
  return (
    <div className="not-prose my-6 flex flex-wrap gap-8 p-4">
      {shadowScale.map(([step, shadow]) => (
        <div key={step} className="flex flex-col items-center gap-3">
          <div
            className="size-16 rounded-lg bg-bg-primary"
            style={{ boxShadow: shadow }}
          />
          <p className="font-mono text-ui-xs text-fg-tertiary">shadow-{step}</p>
        </div>
      ))}
    </div>
  );
}

const blurScale = [
  ["sm", "8px"],
  ["md", "16px"],
  ["lg", "24px"],
] as const;

export function BlurScale() {
  return (
    <div className="not-prose my-6 flex flex-wrap gap-8 p-4">
      {blurScale.map(([step, px]) => (
        <div key={step} className="relative flex size-20 items-center justify-center overflow-hidden rounded-lg bg-bg-brand-subtle">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2740%27%20height=%2740%27%3E%3Ccircle%20cx=%2710%27%20cy=%2710%27%20r=%278%27%20fill=%27%234658DE%27/%3E%3Ccircle%20cx=%2730%27%20cy=%2730%27%20r=%278%27%20fill=%27%23079455%27/%3E%3C/svg%3E')] bg-repeat"
            style={{ filter: `blur(${px})` }}
          />
          <p className="relative z-10 font-mono text-ui-xs font-semibold text-fg-primary">
            blur-{step}
          </p>
        </div>
      ))}
    </div>
  );
}
