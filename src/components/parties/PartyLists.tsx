import type React from "react";
import { PartyListCard } from "./PartyListCard";
import type { TParty } from "../../types/parties";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface IPartyLists {
  title: string;
  items: TParty[];
}

const PartyLists: React.FC<IPartyLists> = ({ title, items = [] }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIdx((prev) => (prev === 0 ? items?.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIdx((prev) => (prev === items?.length - 1 ? 0 : prev + 1));
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const prefersReduced = useReducedMotion();

  const transform = useTransform([rotateX, rotateY], ([rX, rY]) =>
    prefersReduced
      ? "none"
      : `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`,
  );

  return (
    <section className="space-y-3 w-full">
      <div className="w-full flex justify-between items-center gap-4">
        <h2 className="font-bold tracking-tight">{title}</h2>

        {/* Navigation Arrows (Visible on Hover / Always on mobile) */}
        {/* {items.length > 1 && ( */}
        <div className="w-max flex justify-end items-center gap-2">
          <button
            disabled={currentIdx <= 1}
            onClick={handlePrev}
            className="flex h-6 w-6 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed items-center justify-center rounded-full bg-gray-200 dark:bg-black/60 backdrop-blur-sm text-foreground duration-160 ease-out cursor-pointer md:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4 mx-auto" />
          </button>
          <button
            disabled={items?.length <= 1}
            onClick={handleNext}
            className="flex h-6 w-6 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed items-center justify-center rounded-full bg-gray-200 dark:bg-black/60 backdrop-blur-sm text-foreground duration-160 ease-out cursor-pointer md:block"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4 mx-auto" />
          </button>
        </div>
        {/* )} */}
      </div>

      <motion.div
        // className="flex flex-col h-full w-full"
        style={{
          transform,
          transformStyle: "preserve-3d",
        }}
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 w-full"
      >
        {items?.map((item: TParty, idx: number) => (
          <PartyListCard key={idx} party={item} index={idx} />
        ))}
      </motion.div>
    </section>
  );
};

export default PartyLists;
