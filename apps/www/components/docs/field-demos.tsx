"use client";

import { Field } from "@asteria-ui/registry/ui/field";
import { Input } from "@asteria-ui/registry/ui/input";
import { Textarea } from "@asteria-ui/registry/ui/textarea";
import { ComponentPlayground } from "./component-playground";

export function FieldHero() {
  return (
    <ComponentPlayground
      code={`<Field label="Email" description="We'll never share your email.">
  <Input placeholder="you@example.com" />
</Field>`}
    >
      <div className="w-full max-w-xs">
        <Field label="Email" description="We'll never share your email.">
          <Input placeholder="you@example.com" />
        </Field>
      </div>
    </ComponentPlayground>
  );
}

export function FieldError() {
  return (
    <ComponentPlayground
      code={`<Field label="Email" error="Enter a valid email address.">
  <Input placeholder="you@example.com" />
</Field>`}
    >
      <div className="w-full max-w-xs">
        <Field label="Email" error="Enter a valid email address.">
          <Input placeholder="you@example.com" />
        </Field>
      </div>
    </ComponentPlayground>
  );
}

export function FieldWithTextarea() {
  return (
    <ComponentPlayground
      code={`<Field label="Bio" description="Shown on your public profile.">
  <Textarea placeholder="Tell us about yourself" />
</Field>`}
    >
      <div className="w-full max-w-xs">
        <Field label="Bio" description="Shown on your public profile.">
          <Textarea placeholder="Tell us about yourself" />
        </Field>
      </div>
    </ComponentPlayground>
  );
}
