export interface PricingType {
  id: number;
  field_name: string;
  created_at: string;
  name?:string
  language_code?:string
}

export interface FeatureTranslation {
  id: number;
  feature_id: number;
  name: string;
  language_code: string;
  created_at: string;
  feature_name?: string;
}

export interface PricingPeriod {
  id: number;
  field_name: string;
  field_type: string;
  required: boolean;
  localizable: boolean; 
  created_at: string;
}

export interface Group {
  id?: number;
  name?: string;
  title: string;
  group_language_code?:string;
  fields: GroupField[]
}

export interface GroupField {
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

export interface GroupTranslationField {
  id: number;
  feature_id: number;
  name: string;
  language_code: string;
  created_at: string;
}

export interface Language {
  id: number;
  code: string;
  name: string;
  created_at: string;
}

export interface GroupTranslation {
  title: string;
  fields: GroupTranslationField[]
}