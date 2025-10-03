
import { DynamicForm } from "@/components/form/dynamic-product-form";
import { createClient } from "@/utils/supabase/server";
import { Language } from "@/types";
import { getProductData } from "../actions";

export default async function ProductFormWrapper({
  params,
}: {
  params: Promise<{ slug?: string }>
}) {
  const { slug } = await params;
  
  let intent: 'create' | 'update' = 'create';
  if (slug !== 'new') { intent = 'update' }

  const data = await getProductData(slug || 'new')
  const supabase = await createClient()
  const { data: languages, error: languagesError } = await supabase
    .from('languages')
    .select('*')

  const languagesList: Language[] = languagesError || !languages ? [] : languages as Language[]

  return <DynamicForm intent={intent} images={data?.images} productId={data?.id} languages={languagesList} groups={data?.features} />
}
