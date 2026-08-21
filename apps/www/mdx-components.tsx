import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { A11yCallout } from "@/components/docs/a11y-callout";
import {
  AvatarGroupExample,
  AvatarHero,
  AvatarImageFallback,
  AvatarSizes,
  AvatarStatus,
} from "@/components/docs/avatar-demos";
import { AvatarPropsTable } from "@/components/docs/avatar-props-table";
import { ComingSoon } from "@/components/docs/coming-soon";
import {
  BrandScale,
  ErrorScale,
  GrayScale,
  SuccessScale,
  WarningScale,
} from "@/components/docs/foundation-scales";
import { ColorScale, ColorSwatch } from "@/components/docs/color-scale";
import { ComponentPlayground } from "@/components/docs/component-playground";
import { ComponentPreview } from "@/components/docs/component-preview";
import { InstallCommand } from "@/components/docs/install-command";
import { PropsTable } from "@/components/docs/props-table";
import { AvatarInstall } from "@/components/docs/registry-install";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    A11yCallout,
    AvatarGroupExample,
    AvatarHero,
    AvatarImageFallback,
    AvatarInstall,
    AvatarPropsTable,
    AvatarSizes,
    AvatarStatus,
    BrandScale,
    ComingSoon,
    ComponentPlayground,
    GrayScale,
    ErrorScale,
    WarningScale,
    SuccessScale,
    ColorScale,
    ColorSwatch,
    ComponentPreview,
    InstallCommand,
    PropsTable,
    ...components,
  };
}
