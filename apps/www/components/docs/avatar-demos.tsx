"use client";

import {
  Avatar,
  AvatarAddButton,
  AvatarGroup,
} from "@asteria-ui/registry/ui/avatar";
import { ComponentPlayground } from "./component-playground";

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
const addButtonSizes = ["md", "lg", "xl"] as const;

const portrait = (fill: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="${fill}"/><circle cx="40" cy="30" r="14" fill="#ffffff" fill-opacity="0.9"/><ellipse cx="40" cy="72" rx="24" ry="20" fill="#ffffff" fill-opacity="0.9"/></svg>`,
  )}`;

const maya = portrait("#4658DE");
const rio = portrait("#3A46C4");
const ken = portrait("#313B9E");
const ana = portrait("#5C74EB");

export function AvatarHero() {
  return (
    <ComponentPlayground
      code={`<Avatar src="/maya.jpg" alt="Maya Chen" />
<Avatar initials="MC" alt="Maya Chen" />
<Avatar src="/maya.jpg" alt="Maya Chen" status="online" />`}
    >
      <Avatar src={maya} alt="Maya Chen" />
      <Avatar initials="MC" alt="Maya Chen" />
      <Avatar src={maya} alt="Maya Chen" status="online" />
    </ComponentPlayground>
  );
}

export function AvatarSizes() {
  return (
    <ComponentPlayground
      code={sizes
        .map(
          (size) => `<Avatar size="${size}" initials="MC" alt="Maya Chen" />`,
        )
        .join("\n")}
    >
      {sizes.map((size) => (
        <Avatar key={size} size={size} initials="MC" alt="Maya Chen" />
      ))}
    </ComponentPlayground>
  );
}

export function AvatarImageFallback() {
  return (
    <ComponentPlayground
      code={`<Avatar src="/broken.jpg" alt="Maya Chen" initials="MC" />
<Avatar alt="Maya Chen" />
<Avatar initials="MC" />`}
    >
      <Avatar src="/broken.jpg" alt="Maya Chen" initials="MC" />
      <Avatar alt="Maya Chen" />
      <Avatar initials="MC" />
    </ComponentPlayground>
  );
}

export function AvatarStatus() {
  return (
    <ComponentPlayground
      code={`<Avatar src="/maya.jpg" alt="Online" status="online" />
<Avatar src="/maya.jpg" alt="Offline" status="offline" />
<Avatar initials="MC" alt="No status" />`}
    >
      <Avatar src={maya} alt="Online" status="online" />
      <Avatar src={maya} alt="Offline" status="offline" />
      <Avatar initials="MC" alt="No status" />
    </ComponentPlayground>
  );
}

export function AvatarGroupExample() {
  return (
    <ComponentPlayground
      code={`<AvatarGroup max={3}>
  <Avatar src="/maya.jpg" alt="Maya Chen" />
  <Avatar src="/rio.jpg" alt="Rio Patel" />
  <Avatar src="/ken.jpg" alt="Ken Okada" />
  <Avatar src="/ana.jpg" alt="Ana Silva" />
  <Avatar initials="JD" alt="Jordan Diaz" />
</AvatarGroup>`}
    >
      <AvatarGroup max={3}>
        <Avatar src={maya} alt="Maya Chen" />
        <Avatar src={rio} alt="Rio Patel" />
        <Avatar src={ken} alt="Ken Okada" />
        <Avatar src={ana} alt="Ana Silva" />
        <Avatar initials="JD" alt="Jordan Diaz" />
      </AvatarGroup>
    </ComponentPlayground>
  );
}

export function AvatarAddButtonSizes() {
  return (
    <ComponentPlayground
      code={addButtonSizes
        .map((size) => `<AvatarAddButton size="${size}" aria-label="Add" />`)
        .join("\n")}
    >
      {addButtonSizes.map((size) => (
        <AvatarAddButton key={size} size={size} />
      ))}
    </ComponentPlayground>
  );
}

export function AvatarAddButtonWithGroup() {
  return (
    <ComponentPlayground
      code={`<AvatarGroup max={3}>
  <Avatar src="/maya.jpg" alt="Maya Chen" />
  <Avatar src="/rio.jpg" alt="Rio Patel" />
  <Avatar src="/ken.jpg" alt="Ken Okada" />
</AvatarGroup>
<AvatarAddButton aria-label="Add team member" />`}
    >
      <div className="flex items-center gap-3">
        <AvatarGroup max={3}>
          <Avatar src={maya} alt="Maya Chen" />
          <Avatar src={rio} alt="Rio Patel" />
          <Avatar src={ken} alt="Ken Okada" />
        </AvatarGroup>
        <AvatarAddButton aria-label="Add team member" />
      </div>
    </ComponentPlayground>
  );
}
