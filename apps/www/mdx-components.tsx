import { A11yCallout } from "@/components/docs/a11y-callout";
import {
  AvatarGroupExample,
  AvatarHero,
  AvatarImageFallback,
  AvatarSizes,
  AvatarStatus,
} from "@/components/docs/avatar-demos";
import { AvatarPropsTable } from "@/components/docs/avatar-props-table";
import { ColorScale, ColorSwatch } from "@/components/docs/color-scale";
import { ComingSoon } from "@/components/docs/coming-soon";
import { ComponentPlayground } from "@/components/docs/component-playground";
import { ComponentPreview } from "@/components/docs/component-preview";
import {
  BrandScale,
  ErrorScale,
  GrayScale,
  SuccessScale,
  WarningScale,
} from "@/components/docs/foundation-scales";
import { InstallCommand } from "@/components/docs/install-command";
import { PropsTable } from "@/components/docs/props-table";
import { AvatarInstall } from "@/components/docs/registry-install";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

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
