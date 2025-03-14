import { notFound } from "next/navigation";

import {
  getAllServices,
  getServiceById,
  getSubCategoriesByCategoryID,
} from "@/app/actions/services.action";
import { ServiceDetailsPage } from "@/components/shared/pages/service-details-page";

export default async function ServiceDetailsServer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await getServiceById(id);
  const services = await getAllServices();
  const subCat = await getSubCategoriesByCategoryID(
    "b15bd255-537b-4738-bb98-74938098599d",
  );
  if (!service.success) {
    return notFound();
  }
  // console.log("FETCHED SEVR SERVICE", service.service);

  return (
    <ServiceDetailsPage
      service={service.service}
      services={services.services?.services || []}
      subCat={subCat.category || []}
    />
  );
}
