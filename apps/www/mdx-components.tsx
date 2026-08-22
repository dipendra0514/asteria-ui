import { A11yCallout } from "@/components/docs/a11y-callout";
import { AlertHero, AlertVariants, AlertWithActionAndDismiss } from "@/components/docs/alert-demos";
import { AlertPropsTable } from "@/components/docs/alert-props-table";
import {
  AvatarAddButtonSizes,
  AvatarAddButtonWithGroup,
  AvatarGroupExample,
  AvatarHero,
  AvatarImageFallback,
  AvatarSizes,
  AvatarStatus,
} from "@/components/docs/avatar-demos";
import { AvatarPropsTable } from "@/components/docs/avatar-props-table";
import { BadgeDismissible, BadgeHero, BadgeSizes, BadgeWithDot } from "@/components/docs/badge-demos";
import { BadgePropsTable } from "@/components/docs/badge-props-table";
import { BreadcrumbsHero } from "@/components/docs/breadcrumbs-demos";
import { BreadcrumbsPropsTable } from "@/components/docs/breadcrumbs-props-table";
import { ButtonHero, ButtonSizes, ButtonStates, ButtonVariants, ButtonWithIcon } from "@/components/docs/button-demos";
import { ButtonPropsTable } from "@/components/docs/button-props-table";
import { CheckboxHero, CheckboxStates } from "@/components/docs/checkbox-demos";
import { CheckboxPropsTable } from "@/components/docs/checkbox-props-table";
import { ColorScale, ColorSwatch } from "@/components/docs/color-scale";
import { ComingSoon } from "@/components/docs/coming-soon";
import { ComponentPlayground } from "@/components/docs/component-playground";
import { ComponentPreview } from "@/components/docs/component-preview";
import { DividerHero, DividerVertical, DividerWithLabel } from "@/components/docs/divider-demos";
import { DividerPropsTable } from "@/components/docs/divider-props-table";
import { DropdownMenuHero } from "@/components/docs/dropdown-menu-demos";
import { DropdownMenuPropsTable } from "@/components/docs/dropdown-menu-props-table";
import { FieldError, FieldHero, FieldWithTextarea } from "@/components/docs/field-demos";
import { FieldPropsTable } from "@/components/docs/field-props-table";
import {
  BlurScale,
  BrandScale,
  ErrorScale,
  GrayScale,
  RadiusScale,
  ShadowScale,
  SpacingScale,
  SuccessScale,
  TypeScale,
  WarningScale,
} from "@/components/docs/foundation-scales";
import { InputHero, InputSizes, InputStates, InputWithIcons } from "@/components/docs/input-demos";
import { InputPropsTable } from "@/components/docs/input-props-table";
import { InstallCommand } from "@/components/docs/install-command";
import { ModalHero } from "@/components/docs/modal-demos";
import { ModalPropsTable } from "@/components/docs/modal-props-table";
import { ProgressBarHero, ProgressBarSizes } from "@/components/docs/progress-bar-demos";
import { ProgressBarPropsTable } from "@/components/docs/progress-bar-props-table";
import { PropsTable } from "@/components/docs/props-table";
import { RadioGroupDisabled, RadioGroupHero } from "@/components/docs/radio-group-demos";
import { RadioGroupPropsTable } from "@/components/docs/radio-group-props-table";
import {
  AlertInstall,
  AvatarInstall,
  BadgeInstall,
  BreadcrumbsInstall,
  ButtonInstall,
  CheckboxInstall,
  DividerInstall,
  DropdownMenuInstall,
  FieldInstall,
  InputInstall,
  ModalInstall,
  ProgressBarInstall,
  RadioGroupInstall,
  SkeletonInstall,
  SpinnerInstall,
  SwitchInstall,
  TabsInstall,
  TextareaInstall,
  TooltipInstall,
} from "@/components/docs/registry-install";
import { SkeletonCard, SkeletonHero, SkeletonVariants } from "@/components/docs/skeleton-demos";
import { SkeletonPropsTable } from "@/components/docs/skeleton-props-table";
import { SpinnerHero, SpinnerSizes } from "@/components/docs/spinner-demos";
import { SpinnerPropsTable } from "@/components/docs/spinner-props-table";
import { SwitchHero, SwitchStates } from "@/components/docs/switch-demos";
import { SwitchPropsTable } from "@/components/docs/switch-props-table";
import { TabsHero, TabsPillVariant } from "@/components/docs/tabs-demos";
import { TabsPropsTable } from "@/components/docs/tabs-props-table";
import { TextareaHero, TextareaStates } from "@/components/docs/textarea-demos";
import { TextareaPropsTable } from "@/components/docs/textarea-props-table";
import { TooltipHero, TooltipSides } from "@/components/docs/tooltip-demos";
import { TooltipPropsTable } from "@/components/docs/tooltip-props-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    A11yCallout,
    ComingSoon,
    ComponentPlayground,
    ComponentPreview,
    InstallCommand,
    PropsTable,

    // Foundations
    BlurScale,
    BrandScale,
    ColorScale,
    ColorSwatch,
    ErrorScale,
    GrayScale,
    RadiusScale,
    ShadowScale,
    SpacingScale,
    SuccessScale,
    TypeScale,
    WarningScale,

    // Avatar
    AvatarAddButtonSizes,
    AvatarAddButtonWithGroup,
    AvatarGroupExample,
    AvatarHero,
    AvatarImageFallback,
    AvatarInstall,
    AvatarPropsTable,
    AvatarSizes,
    AvatarStatus,

    // Button
    ButtonHero,
    ButtonInstall,
    ButtonPropsTable,
    ButtonSizes,
    ButtonStates,
    ButtonVariants,
    ButtonWithIcon,

    // Badge
    BadgeDismissible,
    BadgeHero,
    BadgeInstall,
    BadgePropsTable,
    BadgeSizes,
    BadgeWithDot,

    // Input
    InputHero,
    InputInstall,
    InputPropsTable,
    InputSizes,
    InputStates,
    InputWithIcons,

    // Field
    FieldError,
    FieldHero,
    FieldInstall,
    FieldPropsTable,
    FieldWithTextarea,

    // Textarea
    TextareaHero,
    TextareaInstall,
    TextareaPropsTable,
    TextareaStates,

    // Checkbox
    CheckboxHero,
    CheckboxInstall,
    CheckboxPropsTable,
    CheckboxStates,

    // Radio Group
    RadioGroupDisabled,
    RadioGroupHero,
    RadioGroupInstall,
    RadioGroupPropsTable,

    // Switch
    SwitchHero,
    SwitchInstall,
    SwitchPropsTable,
    SwitchStates,

    // Alert
    AlertHero,
    AlertInstall,
    AlertPropsTable,
    AlertVariants,
    AlertWithActionAndDismiss,

    // Spinner
    SpinnerHero,
    SpinnerInstall,
    SpinnerPropsTable,
    SpinnerSizes,

    // Divider
    DividerHero,
    DividerInstall,
    DividerPropsTable,
    DividerVertical,
    DividerWithLabel,

    // Skeleton
    SkeletonCard,
    SkeletonHero,
    SkeletonInstall,
    SkeletonPropsTable,
    SkeletonVariants,

    // Progress Bar
    ProgressBarHero,
    ProgressBarInstall,
    ProgressBarPropsTable,
    ProgressBarSizes,

    // Breadcrumbs
    BreadcrumbsHero,
    BreadcrumbsInstall,
    BreadcrumbsPropsTable,

    // Tooltip
    TooltipHero,
    TooltipInstall,
    TooltipPropsTable,
    TooltipSides,

    // Dropdown Menu
    DropdownMenuHero,
    DropdownMenuInstall,
    DropdownMenuPropsTable,

    // Modal
    ModalHero,
    ModalInstall,
    ModalPropsTable,

    // Tabs
    TabsHero,
    TabsInstall,
    TabsPillVariant,
    TabsPropsTable,

    ...components,
  };
}
