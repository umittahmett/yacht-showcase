import { toSnakeCase } from "@/utils/text-to-snake-case";
import { z } from "zod";

export const buildSchemaFromFields = (groups: any[]) => {
  const shape: Record<string, any> = {};

  groups.forEach((group) => {
    const groupShape: Record<string, any> = {};

    group.fields.forEach((field: any) => {
      const { field_name, field_type, required } = field;
      let base = field_type === "toggle" ? z.boolean() : z.string();
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
      } else {
        defaults[toSnakeCase(group.title)][field_name] = field.value ?? "";
      }
    });
  });

  return defaults;
};