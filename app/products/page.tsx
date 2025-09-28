import ProductList from "./_components/product-list";

export default async function ProductsDetailPage() {

  let data: any, filters: any;

  try {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/products`;
    const res = await fetch(`${url}`);
    const { data: productsData, filters: filterData } = await res.json();
    data = productsData;
    filters = filterData;
  } catch (e) {
    console.error("Error fetching product:", e);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductList products={data || []} filters={filters || []} />
    </div>
  );
}