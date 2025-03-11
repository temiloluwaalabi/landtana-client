import { notFound } from "next/navigation";

import { getAllServices, getServiceById } from "@/app/actions/services.action";
import { ServiceDetailsPage } from "@/components/shared/pages/service-details-page";

export default async function ServiceDetailsServer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await getServiceById(id);
  const services = await getAllServices();

  if (!service.success) {
    return notFound();
  }
  // console.log("FETCHED SEVR SERVICE", service.service);

  return (
    <ServiceDetailsPage
      service={service.service}
      services={services.services?.services || []}
    />
  );
}
