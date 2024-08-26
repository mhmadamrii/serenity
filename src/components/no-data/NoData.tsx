"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

interface IProps {
  name: string;
  shouldRender: boolean;
  title: string;
  createPathUrl: string;
}

export function NoData({ shouldRender, title, createPathUrl, name }: IProps) {
  const router = useRouter();
  return (
    <div
      className={cn("flex w-full flex-col items-center justify-center", {
        hidden: !shouldRender,
      })}
    >
      <Image
        alt="illustrator empty"
        src="/png/empty.png"
        width={300}
        height={100}
      />
      <p className="my-3 font-semibold">{title}</p>
      <Button
        onClick={() => router.push(createPathUrl)}
        className="w-full sm:w-[300px]"
      >
        Create {name}
      </Button>
    </div>
  );
}
