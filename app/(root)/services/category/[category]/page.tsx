import { notFound } from "next/navigation";

import {
  getAllCategories,
  getAllServices,
  getCategoryByID,
} from "@/app/actions/services.action";
import { CategoryServiceList } from "@/components/shared/pages/category-services-list";

export default async function ServiceDetailsServer({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryD = await getCategoryByID(category);
  //   const services = await getServicesByCategory(category);
  const services = await getAllServices();
  const categories = await getAllCategories();

  const categoryIds = [category];
  categories.categories?.forEach((cat) => {
    if (cat.parent_id === category) {
      categoryIds.push(cat.id);
    }
  });

  const filteredServices =
    services.services?.services.filter((service) =>
      categoryIds.includes(service.category_id || ""),
    ) || [];

  if (!categoryD.success) {
    return notFound();
  }

  return (
    <CategoryServiceList
      categories={categories.categories || []}
      category={categoryD.category}
      services={filteredServices || []}
    />
  );
}
