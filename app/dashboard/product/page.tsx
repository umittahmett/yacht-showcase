import { DynamicForm } from "@/components/form/dynamic-product-form";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";

interface Group {
  title: string;
  group_language_code?:string;
  fields: GroupField[]
}

interface GroupField {
  id: number;
  field_title?:string;
  field_language_code?:string
  name: string;
  field_name: string;
  field_type: string;
  required: boolean;
  localizable: boolean;
  language_code: string;
  created_at: string;
}

interface GroupTranslationField {
  id: number;
  feature_id: number;
  name: string;
  language_code: string;
  created_at: string;
}

interface Language {
  id: number;
  code: string;
  name: string;
  created_at: string;
}

interface FeatureTranslation {
  id: number;
  feature_name: string;
  name: string;
  language_code: string;
  created_at: string
}

interface GroupTranslation {
  title: string;
  fields: GroupTranslationField[]
}

export default async function ProductFormWrapper() {
  const supabase = await createClient();
  const groupNames = [
    "base_informations",
    "general_features",
    "cabin_details",
    "services",
    "technical_specifications",
    "water_sports",
  ];

  const groups:Group[] = (await Promise.all(
    groupNames.map(async (groupName) => {
      const { data, error } = await supabase.from(groupName).select("*");

      if (error) {
        console.error("Error fetching fields:", error);
        return [];
      }
      return {
        title: groupName,
        fields: data,
      };
    })
  )) as Group[];
  
  const groups_translations:GroupTranslation[] = (await Promise.all(
    groupNames.map(async (groupName) => {
      const {data, error} = await supabase.from(`${groupName}_translations`).select("*");

      if (error) {
        console.error("Error fetching fields:", error);
        return [];
      }
      return {
        title: groupName,
        fields: data,
      };
    })
  )) as GroupTranslation[];
  
  const features_translations:FeatureTranslation[] = await 
  supabase.from(`features_translations`).select("*").then(response => {
    if (response.error) {
      console.error("Error fetching fields:", error);
      return [];
    }
    return response.data;
  })

  const languages:Language[] = await 
  supabase.from(`languages`).select("*").then(response => {
    if (response.error) {
      console.error("Error fetching fields:", error);
      return [];
    }
    return response.data;
  })

  const translatedGroups = groups.map((group: Group) => {
    const translationGroup = groups_translations.find(
      (transGroup) => (transGroup as GroupTranslation).title === group.title
    ) as GroupTranslation | undefined;

    const translatedGroup = features_translations?.find(
      (transGroup: FeatureTranslation) =>
        transGroup.feature_name === group.title && transGroup.language_code === "en"
    ) as FeatureTranslation | undefined;

    return {
      name: group.title,
      title: translatedGroup?.name ?? group.title,
      group_language_code: translatedGroup?.language_code ?? null,
      fields: group.fields.map((field: GroupField) => {
        const translationField =(
          translationGroup && translationGroup.fields
            ? translationGroup.fields.find(
                (transField) =>{
                  return (transField as GroupTranslationField).feature_id === field.id && transField.language_code === "en"
                }
              )
            : null) as GroupTranslationField | undefined;

        return {
          ...field,
          field_title: translationField ? translationField.name : field.field_name,
          field_language_code: translationField ? translationField.language_code : null,
        };
      }),
    };
  });

  return <DynamicForm languages={languages} groups={translatedGroups} />;
}
