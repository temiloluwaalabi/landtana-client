import { notFound } from "next/navigation";

import { getAllServices, getCategoryByID } from "@/app/actions/services.action";
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

  if (!categoryD.success) {
    return notFound();
  }

  return (
    <CategoryServiceList
      category={categoryD.category}
      services={
        services.services?.services.filter(
          (service) => service.category_id === category,
        ) || []
      }
    />
  );
}
