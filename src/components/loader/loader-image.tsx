import Image from "next/image";
import loading from "../../../public/svg/3-dots-move.svg";

export function LoaderImage({ loadingUrl }: { loadingUrl?: string }) {
  return (
    <Image priority src={loadingUrl ?? loading} alt="Follow us on Twitter" />
  );
}
