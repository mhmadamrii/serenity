"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "~/lib/utils";
import { LoaderImage } from "../loader/loader-image";

interface IProps {
  name: string;
  shouldRender: boolean;
  title: string;
  createPathUrl: string;
}

export function NoData({ shouldRender, title, createPathUrl, name }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const renderForm = searchParams.get("type");

  useEffect(() => {
    if (!renderForm) {
      setIsLoading(false);
    }

    if (renderForm) {
      setIsLoading(false);
    }
  }, [renderForm]);

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
        onClick={() => {
          router.push(createPathUrl);
          setIsLoading(true);
        }}
        className="w-full sm:w-[300px]"
      >
        {isLoading ? <LoaderImage /> : `Create ${name}`}
      </Button>
    </div>
  );
}
