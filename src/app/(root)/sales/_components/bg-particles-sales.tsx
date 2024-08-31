"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "~/components/magicui/particles";

export function BgParticlesSales() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
