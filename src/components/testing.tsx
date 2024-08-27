import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { ContactSkeleton } from "./skeletons/contact-skeleton";

export function BreadcrumbWithCustomSeparator() {
  return <ContactSkeleton />;
}
