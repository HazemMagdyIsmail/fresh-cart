export async function getSubCategoriesByCategory(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
  );
  const json = await res.json();
  return json.data; 
}
