export const transformPricingData  = (data:any) => {
  const grouped:any = {};

  data.forEach((item:any) => {
    const type = item.pricing_types;
    const period = item.pricing_periods;

    if (!grouped[type.id]) {
      grouped[type.id] = {
        id: type.id,
        name: type.field_name,
        title: type.pricing_types_translations.find(t => t.language_code === "en")?.name || type.field_name,
        group_language_code: "en",
        fields: []
      };
    }

    grouped[type.id].fields.push({
      id: period.id,
      field_name: period.field_name,
      created_at: period.created_at,
      field_type: period.field_type,
      required: period.required,
      localizable: period.localizable,
      field_title: period.pricing_periods_translations.find(t => t.language_code === "en")?.name || period.field_name,
      field_language_code: "en",
      value: item.value ? item.value : null
    });
  });

  return Object.values(grouped);
}