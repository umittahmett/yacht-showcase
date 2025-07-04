"use client";

export default function Home() {
  // const supabase = createClient();

  // const dataArray = [
  //   {
  //     name: "Harbor fees and checkout",
  //     field_name: "harbor_fees_and_checkout",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Costs of transit log document and shipping agency for necessary procedures",
  //     field_name: "costs_of_transit_log_document_and_shipping_agency",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Cost of moorage",
  //     field_name: "cost_of_moorage",
  //     language_code: "en",
  //   },
  //   { name: "Crew service", field_name: "crew_service", language_code: "en" },
  //   { name: "Utility water", field_name: "utility_water", language_code: "en" },
  //   {
  //     name: "Fuel costs on route",
  //     field_name: "fuel_costs_on_route",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Quilt cover and bathroom sets",
  //     field_name: "quilt_cover_and_bathroom_sets",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Free use of boat equipments",
  //     field_name: "free_use_of_boat_equipments",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Yacht insurance (individual travel insurance is recommended)",
  //     field_name: "yacht_insurance",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Yacht provisions and drinks",
  //     field_name: "yacht_provisions_and_drinks",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Keelage and customs expenses on foreign territorial waters",
  //     field_name: "keelage_and_customs_expenses",
  //     language_code: "en",
  //   },
  //   { name: "VAT", field_name: "vat", language_code: "en" },
  //   {
  //     name: "Airport transfers",
  //     field_name: "airport_transfers",
  //     language_code: "en",
  //   },
  //   {
  //     name: "Use of fuel-operated water sports equipment if available on boat",
  //     field_name: "use_of_fuel_operated_water_sports_equipment",
  //     language_code: "en",
  //   },
  // ];

  // const addFeatures = async () => {
  //   const { data, error } = await supabase.from("services").select("*");

  //   if (!error) {
  //     const insertData = dataArray
  //       .map((item) => {
  //         const matchingItem = data?.find(
  //           (entry) => entry.field_name === item.field_name
  //         );

  //         if (matchingItem) {
  //           return {
  //             name: item.name,
  //             language_code: "en",
  //             service_id: matchingItem.id,
  //           };
  //         }
  //         return null;
  //       })
  //       .filter((item) => item !== null);

  //     if (insertData.length > 0) {
  //       console.log("Inserting data:", insertData);

  //       const { data, error } = await supabase
  //         .from("service_translations")
  //         .insert(insertData)
  //         .select();
  //       if (error) {
  //         console.error("Error inserting data:", error);
  //       }
  //       console.log("Data inserted successfully:", data);
  //     }
  //   } else {
  //     console.error("Error inserting data:", error);
  //   }
  // };

  return (
    <button
      className="rounded-lg cursor-pointer bg-blue-500 text-white px-6 py-3"
    >
      sa
    </button>
  );
}
