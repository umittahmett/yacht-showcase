"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { toSnakeCase } from "@/utils/text-to-snake-case";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "../ui/alert-dialog";
import { createProduct } from "@/app/dashboard/product/actions";
import { productRenderFormControl } from "./product-render-form-control";
import { buildSchemaFromFields, generateDefaultValues } from "@/lib/validation/schema-utils";
import { FileUpload } from "../ui/file-upload";
import { z } from "zod";

interface DynamicFormProps {
  languages: any[]
  groups: any[]
}

export const DynamicForm:React.FC<DynamicFormProps> = ({languages, groups }) => {
  const [isFormReady, setIsFormReady] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages?.[0]?.code ?? '');
  const [pendingLanguage, setPendingLanguage] = useState<string>('');
  const [isSwitchLanguageAlertOpen, setIsSwitchLanguageAlertOpen] = useState(false);

  const schemaWithFiles = useMemo(() => {
    const baseSchema = buildSchemaFromFields(groups);
    return baseSchema.extend({
      images: z.array(
      z.instanceof(File)
        .refine(file => file.size <= 1 * 1024 * 1024, "Her bir dosya 5MB'dan küçük olmalı")
      )
      .min(1, "En az bir resim yüklemelisiniz")
      .refine(
      files => files.reduce((acc, file) => acc + file.size, 0) <= 5 * 1024 * 1024,
      "Toplam dosya boyutu 5MB'dan küçük olmalı"
      )
    });
  }, [groups]);

  const form = useForm({
    resolver: zodResolver(schemaWithFiles),
    defaultValues: {
      ...generateDefaultValues(groups),
      images: []
    },
  });

  const handleFileUpload = (files: File[]) => {
    if (!files || files.length === 0){
      console.log("File upload is empty");
      form.resetField('images', {
        defaultValue: [],
        keepDirty: false,
        keepTouched: false,
        keepError: false,
      });
    }

    else{
      form.setValue('images', files, {
        shouldValidate: true,
        shouldDirty: true
      });
    }
  };

  useEffect(() => {
    setIsFormReady(true);
  }, []);

  useEffect(() => {
    if (isFormReady) {
      form.reset(generateDefaultValues(groups));
    }
  }, [form, groups, isFormReady]);

  useEffect(() => {
    if (selectedLanguage && pendingLanguage && !isSwitchLanguageAlertOpen) {
      if (form.formState.isDirty) {
        setIsSwitchLanguageAlertOpen(true);
      } else {
        setSelectedLanguage(pendingLanguage);
        setPendingLanguage('');
      }
    }
  }, [pendingLanguage, isSwitchLanguageAlertOpen, form.formState.isDirty, selectedLanguage]);

  const onSubmit = async (data: any) => {
    try {
      const featuresArray: Array<{
        id?: number,
        group_name: string,
        fields: Array<{
          id: number,
          field_name: string,
          field_type: string,
          localizable: boolean,
          value: any
        }>
      }> = [];

      groups.forEach(group => {
        const groupKey = group.name

        const groupData = {
          id: group.id,
          group_name: groupKey,
          fields: [] as Array<{
            id: number,
            field_name: string,
            field_type: string,
            localizable: boolean,
            value: any
          }>
        };

        group.fields.forEach((formField: any) => {
          const fieldValue = data[groupKey]?.[formField.field_name];

          groupData.fields.push({
            id: formField.id,
            field_name: formField.field_name,
            field_type: formField.field_type,
            localizable: formField.localizable,
            value: fieldValue
          });
        });

        featuresArray.push(groupData);
      });

      const formData = new FormData();
      if (data.images && data.images.length > 0) {
        data.images.forEach((file: File) => {
          formData.append("images", file);
        });
      }
      console.log('data.images: ', data.images);

      formData.append("features", JSON.stringify(featuresArray));
      formData.append("language", JSON.stringify(selectedLanguage));

      await createProduct(formData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isFormReady) return null;

  return (
    <div className="relative w-full">
      <Select
        onValueChange={(value:string)=>{
          setPendingLanguage(value);
        }}
        value={selectedLanguage}
      >
        <SelectTrigger className="ml-auto mt-4 w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem
              key={lang.id}
              value={lang.code}
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Form {...form}>
        <form
          className="z-10 grid grid-cols-3 gap-10 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem
                className="text-base font-medium col-span-full"
              >
                <FormLabel>
                  Product Images
                </FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={(files) => {
                      field.onChange(files);
                      handleFileUpload(files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {groups.map((group) => (
            <div
              className={clsx('border first:mt-4 border-neutral-200 shadow-sm rounded-lg relative bg-neutral-50 p-6 overflow-hidden lg:p-8', group.name.includes('price') ? 'col-span-1' : 'col-span-full')}
              key={group.title}
            >
              <h2 className="relative z-[1] text-lg font-bold pb-6 text-neutral-900">
                {group.title}
              </h2>

              <div className={clsx("relative z-[1] space-y-3 border-t border-neutral-300 grid gap-6 pt-6", group.name.includes('price') ? 'grid-cols-1' : 'lg:grid-cols-2')}>
                {group.fields.map((formField:any) => {
                  const fieldName = `${toSnakeCase(group.title)}.${formField.field_name}`;
                  const isFieldDisabled = formField.localizable === false && selectedLanguage !== languages[0]?.code;
                  const isCheckboxOrToggle = formField.field_type === "checkbox" || formField.field_type === "toggle";

                  if (!isFieldDisabled) {
                    return (
                      <FormField
                        key={`${fieldName}-${formField.id}`}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                          <FormItem
                            className={clsx("text-base font-medium", {
                              "flex items-center": isCheckboxOrToggle,
                              "col-span-2": formField.field_type === "markdown",
                            })}
                          >
                            <FormLabel
                              className={clsx("", {
                                "order-2":
                                  formField.field_type == "checkbox" ||
                                  formField.field_type == "toggle",
                                  'opacity-50 cursor-not-allowed': isFieldDisabled
                              })}
                            >
                              {formField.field_title}
                            </FormLabel>
                            <FormControl>
                              {productRenderFormControl(formField, field)}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  }
                })}
              </div>

              <div className="bg-gradient-to-bl from-sky-400 via-white to-white absolute top-0 left-0 w-full h-full opacity-20"></div>
            </div>
          ))}

          <div className="sticky col-span-full w-full z-10 !my-0 bg-white/10 opacity-100 shadow-sm border border-neutral-200 bottom-6 backdrop-blur-lg left-0 p-6 lg:p-8 rounded-t-lg flex items-center justify-end">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="block"
            >
              Save and Publish
            </Button>
          </div>
        </form>
      </Form>

      {/* Language Switch Alert */}
      <AlertDialog
        open={isSwitchLanguageAlertOpen}
        onOpenChange={setIsSwitchLanguageAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              current product specifications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{
              setPendingLanguage('');
              setIsSwitchLanguageAlertOpen(false);
            }}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction onClick={()=>{
              setSelectedLanguage(pendingLanguage);
              setPendingLanguage('');
              form.reset();
              setIsSwitchLanguageAlertOpen(false);
            }}>
              Close Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
