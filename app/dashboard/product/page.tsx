import { DynamicForm } from "@/components/form/dynamic-product-form";
import { snakeCaseToText } from "@/utils/camel-case-to-text";
import { createClient } from "@/utils/supabase/server";

export default async function ProductFormWrapper() {
  const supabase = await createClient();
  const groupNames = [
    "base_information",
    "general_features",
    "services",
    "technical_specifications",
    "water_sports",
  ];

  let groups = await Promise.all(
    groupNames.map(async (groupName) => {
      const { data, error } = await supabase.from(groupName).select("*");

      if (error) {
        console.error("Error fetching fields:", error);
        return [];
      }
      return {
        title: snakeCaseToText(groupName),
        fields: data,
      };
    })
  );

  return <DynamicForm groups={groups} />;
}
