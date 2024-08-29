import { useMemo } from "react";

export function ImagePlaceholder({ name }: { name: string }) {
  const firstChar = name.split("");
  const randomColor = useMemo(() => {
    return Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"); // Ensure it's always 6 digits
  }, [name]);

  return (
    <div className="h-full w-full pb-4 pt-0">
      <h1
        className="rounded-t-lg text-center text-8xl font-bold"
        style={{ backgroundColor: `#${randomColor}` }}
      >
        {firstChar[0]?.toUpperCase()}
      </h1>
    </div>
  );
}
