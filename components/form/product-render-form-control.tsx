import MDEditor from "@uiw/react-md-editor";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { GroupField } from "@/types/product";


export function productRenderFormControl(
  formField: GroupField,
  field: ControllerRenderProps<FieldValues, string>
): React.ReactNode {
  switch (formField.field_type) {
    case "textarea":
      return (
        <textarea
          {...field}
          disabled={field.disabled}
          value={field.value || ""}
        />
      );
    case "markdown":
      return (
        <div data-color-mode="light">
          <MDEditor
            aria-disabled={field.disabled}
            value={field.value || ""}
            onChange={field.onChange}
          />
        </div>
      );
    case "toggle":
      return (
        <Switch
          checked={field.value}
          disabled={field.disabled}
          onCheckedChange={field.onChange}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          checked={field.value}
          disabled={field.disabled}
          onCheckedChange={field.onChange}
        />
      );
    default:
      return (
        <Input
          type={formField.field_type}
          disabled={field.disabled}
          placeholder={formField.field_title}
          {...field}
          value={field.value || ""}
        />
      );
  }
}
