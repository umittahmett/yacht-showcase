const featureGroups = [
  "base_informations",
  "general_features",
  "cabin_details",
  "services",
  "technical_specifications",
  "water_sports",
];

export const transformProductFeatures = (productData: any, languageCode: string = 'en') => {
  const transformed: any = {
    ...productData,
    features: []
  };

  featureGroups.forEach((group) => {
    const productFeatureKey = `product_${group}`;
    const productFeatures = productData[productFeatureKey];

    if (!productFeatures || productFeatures.length === 0) {
      return;
    }

    const featureGroup = {
      name: group,
      title: group.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      group_language_code: languageCode,
      fields: productFeatures.map((item: any) => {
        const feature = item[group];
        
        if (!feature) return null;

        const translations = feature[`${group}_translations`] || [];
        const translation = translations.find(
          (t: any) => t.language_code === languageCode
        );

        return {
          id: feature.id,
          created_at: feature.created_at,
          field_name: feature.field_name,
          field_type: feature.field_type,
          ...(feature.suffix !== undefined && { suffix: feature.suffix }),
          required: feature.required,
          localizable: feature.localizable,
          field_title: translation?.name || feature.field_name,
          field_language_code: languageCode,
          value: item.value
        };
      }).filter(Boolean)
    };

    transformed.features.push(featureGroup);
    delete transformed[productFeatureKey];
  });

  return transformed;
};