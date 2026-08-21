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
