import { create } from "zustand";
import { ZodSchema } from "zod";

type SchemaMap = {
  [step: string]: ZodSchema;
};

type FormSchemaStore = {
  schemas: SchemaMap;
  setSchemas: (schemas: SchemaMap) => void;
  getSchema: (step: string) => ZodSchema | undefined;
};

export const useFormSchemaStore = create<FormSchemaStore>((set, get) => ({
  schemas: {},
  setSchemas: (schemas) => set({ schemas }),
  getSchema: (step) => get().schemas[step],
}));
