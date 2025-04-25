import { z, ZodTypeAny } from "zod";

const getZodType = (type: string, required: boolean): ZodTypeAny => {
  let base;
  switch (type) {
    case "string":
      base = z.string();
      break;
    case "number":
      base = z.number();
      break;
    case "boolean":
      base = z.boolean();
      break;
    default:
      base = z.any();
  }

  return required ? base : base.optional();
};

export const buildDynamicSchema = (fields: { name: string; type: string; required: boolean }[]) => {
  const shape: Record<string, ZodTypeAny> = {};

  fields.forEach((field) => {
    shape[field.name] = getZodType(field.type, field.required);
  });

  return z.object(shape);
};