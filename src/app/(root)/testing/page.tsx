import Image from "next/image";

export default function Testing() {
  return (
    <section>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, placeat
        quod voluptates, odit molestiae dolorem, rerum architecto culpa at saepe
        amet eaque voluptas sapiente. Blanditiis nesciunt voluptatibus sequi
        possimus voluptates!
      </p>
      <Image
        quality={100}
        alt="user image"
        src="/no-profile.png"
        className="h-[300px] w-[300px] rounded-sm border border-gray-600"
        priority
        width={300}
        height={200}
      />
    </section>
  );
}
