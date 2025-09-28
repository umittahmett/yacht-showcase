import { toSnakeCase } from "@/utils/text-to-snake-case";
import { z } from "zod";

export const buildSchemaFromFields = (groups: any[]) => {
  const shape: Record<string, any> = {};

  groups.forEach((group) => {
    const groupShape: Record<string, any> = {};

    group.fields.forEach((field: any) => {
      const { field_name, field_type, required } = field;
      const base = field_type === "toggle" ? z.boolean() : field_type === "number" ? z.coerce.number() : field_type === 'checkbox' ? z.boolean() : z.coerce.string();
      if (required) {
        groupShape[field_name] =
          field_type === "toggle"
            ? base
            : (base as z.ZodString).min(1, `${field_name} zorunlu`);
      } else {
        groupShape[field_name] = base.optional(); 
      }
    });

    shape[toSnakeCase(group.title)] = z.object(groupShape);
  });

  return z.object(shape);
};

export const generateDefaultValues = (groups: any[]) => {
  const defaults: Record<string, any> = {};

  groups.forEach((group) => {
    defaults[toSnakeCase(group.title)] = {};
    group.fields.forEach((field: any) => {
      const { field_name, field_type } = field;
      if (field_type === "toggle" || field_type === "checkbox") {
        defaults[toSnakeCase(group.title)][field_name] = field.value == "true";
      }
      else if (field_type === "number") {
        defaults[toSnakeCase(group.title)][field_name] = Number(field.value) ?? 0;
      }
      else {
        defaults[toSnakeCase(group.title)][field_name] = field.value ?? "";
      }
    });
  });

  return defaults;
};