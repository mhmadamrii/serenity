import Marquee from "~/components/magicui/marquee";
import { cn } from "~/lib/utils";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "Serenity has completely transformed how I manage my accounting tasks. It's intuitive and powerful.",
    img: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I've tried many accounting software solutions, but Serenity stands out for its ease of use and efficiency.",
    img: "https://i.pravatar.cc/300?img=2",
  },
  {
    name: "John",
    username: "@john",
    body: "As an accountant, I need software I can rely on. Serenity delivers every time, making my job easier.",
    img: "https://i.pravatar.cc/300?img=3",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Serenity is a game-changer for accountants. The interface is clean, and the features are exactly what I need.",
    img: "https://i.pravatar.cc/300?img=4",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I was skeptical at first, but Serenity has exceeded my expectations. It's now a vital part of my workflow.",
    img: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "James",
    username: "@james",
    body: "The best part about Serenity? It just works. No fuss, no hassle—just results.",
    img: "https://i.pravatar.cc/300?img=6",
  },
] as const;

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function FeedbackMarquee() {
  return (
    <div className="relative flex h-[620px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="mb-10 mt-8 flex w-full flex-col gap-2 text-center">
        <h1 className="text-center text-3xl font-extrabold">
          What Accountants Are Saying About Serenity
        </h1>
        <div>
          <p className="font-bold text-gray-400">
            Don't just take our word for it. Here's what real
          </p>
          <p className="font-bold text-gray-400">
            people are saying about{" "}
            <span className="font-extrabold">SERENITY</span>
          </p>
        </div>
      </div>

      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
