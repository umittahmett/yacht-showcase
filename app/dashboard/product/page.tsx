import { DynamicForm } from "@/components/form/dynamic-product-form";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";

interface Group {
  title: string;
  fields: {
    name: string;
    field_name: string;
    field_type: string;
    required: boolean;
    localizable: boolean;
    language_code: string;
    created_at: string;
  }[];
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
  
  let groups_translations = await Promise.all(
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
  );


  
  const features_translations:any = await 
  supabase.from(`features_translations`).select("*").then(response => {
    if (response.error) {
      console.error("Error fetching fields:", error);
      return [];
    }
    return response.data;
  })

  const translatedGroups = groups.map((group:any) => {
    const translationGroup:any = groups_translations.find((transGroup:any) => 
      transGroup.title === group.title
    );

    const translatedGroup = features_translations?.find((transGroup:any) => 
      transGroup.feature_name === group.title && transGroup.language_code === "en"
    );
    
    return {
      title: translatedGroup.name,
      group_language_code: translatedGroup.language_code,
      fields: group.fields.map((field:any) => {

        const translationField = translationGroup ? 
          translationGroup.fields.find((transField:any) => 
            transField.feature_id === field.id && transField.language_code === "en"
          ) : null;
        

        return {
          ...field,
          field_title: translationField ? translationField.name : field.field_name,
          field_language_code: translationField ? translationField.language_code : null
        };
      })
    };
  });

  console.log("Translated Groups: ", translatedGroups);
  

  return <DynamicForm groups={translatedGroups} />;
}
