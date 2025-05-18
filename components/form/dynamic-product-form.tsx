"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { snakeCaseToText } from "@/utils/snake-case-to-text";
import { Switch } from "@/components/ui/switch";
import clsx from "clsx";
import { toSnakeCase } from "@/utils/text-to-snake-case";

const buildSchemaFromFields = (groups: any[]) => {
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

const generateDefaultValues = (groups: any[]) => {
  const defaults: Record<string, any> = {};

  groups.forEach((group) => {
    defaults[toSnakeCase(group.title)] = {};
    group.fields.forEach((field: any) => {
      const { field_name, field_type } = field;
      if (field_type === "toggle" || field_type === "checkbox") {
        defaults[toSnakeCase(group.title)][field_name] = false;
      } else {
        defaults[toSnakeCase(group.title)][field_name] = "";
      }
    });
  });

  return defaults;
};


export const DynamicForm = ({ groups }: any) => {
  const [fieldGroups, setFieldGroups] = useState<any[]>([]);
  const [schema, setSchema] = useState<z.ZodSchema | null>(null);
  const [defaultValues, setDefaultValues] = useState({});
  const [isFormReady, setIsFormReady] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const schema = buildSchemaFromFields(groups);
    console.log('generated');
    
    setSchema(schema);
    setDefaultValues(generateDefaultValues(groups));
    setFieldGroups(groups);
    setIsFormReady(true);
  }, [groups]);

  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (schema) {
      form.reset(defaultValues);
    }
  }, [schema, defaultValues, form]);

  if (!isFormReady) return null;

  return (
    <div className="relative w-full">
      <Form {...form}>
        <form
          className="z-10 *:my-10 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fieldGroups.map((group) => (
            <div
              className="border border-neutral-200 shadow-sm rounded-3xl relative bg-neutral-50 p-6 overflow-hidden lg:p-8"
              key={group.title}
            >
              <h2 className="relative z-[1] text-3xl font-bold pb-6 text-neutral-900">
                {group.title}
              </h2>
              <div className="relative z-[1] space-y-3 border-t border-neutral-300 grid lg:grid-cols-2 gap-6 pt-6">
                {group.fields.map((formField: any, index: number) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`${toSnakeCase(group.title)}.${formField.field_name}`}
                    render={({ field }) => (
                      <FormItem
                        className={clsx("text-base font-medium", {
                          "flex items-center":
                            formField.field_type == "checkbox" ||
                            formField.field_type == "toggle",
                          "col-span-2": formField.field_type == "markdown",
                        })}
                      >
                        <FormLabel
                          className={clsx("", {
                            "order-2":
                              formField.field_type == "checkbox" ||
                              formField.field_type == "toggle",
                          })}
                        >
                          {snakeCaseToText(formField.field_title)}
                        </FormLabel>
                        <FormControl
                          className={clsx({
                            "order-1":
                              formField.field_type == "checkbox" ||
                              formField.field_type == "toggle",
                          })}
                        >
                          {formField.field_type === "textarea" ? (
                            <textarea
                              {...field}
                              value={field.value || ""}
                              className="border px-2 py-1"
                            />
                          ) : formField.field_type === "markdown" ? (
                            <div data-color-mode="light">
                              <MDEditor
                                className="!h-80"
                                value={field.value || ""}
                                onChange={field.onChange}
                              />
                            </div>
                          ) : formField.field_type === "toggle" ? (
                            <Switch
                              checked={field.value}
                              defaultChecked={false}
                              onCheckedChange={field.onChange}
                            />
                          ) : formField.field_type === "checkbox" ? (
                            <Checkbox
                              id="terms"
                              checked={field.value}
                              defaultChecked={false}
                              onCheckedChange={field.onChange}
                            />
                          ) : (
                            <Input
                              type={formField.type}
                              placeholder={formField.field_title}
                              {...field}
                              value={field.value || ""}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="bg-gradient-to-bl from-sky-400 via-white to-white absolute top-0 left-0 w-full h-full opacity-20"></div>
            </div>
          ))}

          <div className="sticky w-full z-10 !my-0 bg-white/10 opacity-100 shadow-sm border border-neutral-200 bottom-6 backdrop-blur-lg left-0 p-6 lg:p-8 rounded-t-3xl flex items-center justify-end">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="block"
            >
              Submit
            </Button>
          </div>
        </form>

        
      </Form>

      <div className="mt-4">
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="text-red-500">
            <h3 className="font-bold">Form Errors:</h3>
            <ul className="list-disc list-inside">
        {Object.entries(form.formState.errors).map(([key, error]) => (
          <li key={key}>
            {snakeCaseToText(key)}: {(error as any).message}
          </li>
        ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
