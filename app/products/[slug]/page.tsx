import ProductDetails from "../_components/product-details";

export default async function ProductsDetailPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {

  const { slug } = await params;
  const id = slug && slug.length ? Number(slug) : undefined;
  if (!id || Number.isNaN(id)) {
    return <div className="container py-10">Invalid product id</div>;
  }

  let data:any;
  const apiKey = process.env.NEXT_API_KEY;
  try {
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public/products/${id}`,{
      headers:{
        'api-key' : apiKey
      }
    })
    data = await res.json()
    console.log("data", data)
  } catch (e) {
    console.log("Error fetching product: ", e)
  }

  if (!data) {
    return <div className="container py-10">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetails product={data} />
    </div>
  );
}