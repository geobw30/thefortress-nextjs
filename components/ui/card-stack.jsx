"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

let interval;

export const CardStack = ({
  items,
  offset,
  scaleFactor,
  fullScreen = false,
  opacity = 1,
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  if (fullScreen) {
    return (
      <div className="absolute inset-0 w-full h-full" style={{ opacity }}>
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.id}
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
              style={{
                transformOrigin: "center",
              }}
              animate={{
                scale: 1 - index * SCALE_FACTOR,
                zIndex: cards.length - index,
              }}
            >
              <img
                src={card.src}
                alt={card.alt || `Image ${card.id}`}
                className="object-cover w-full h-full"
              />
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative h-[22.5rem] w-[22.5rem] md:h-[22.5rem] md:w-[36rem]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-[22.5rem] w-[22.5rem] md:h-[22.5rem] md:w-[36rem] rounded-3xl flex items-center justify-center overflow-hidden"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <img
              src={card.src}
              alt={card.alt || `Image ${card.id}`}
              className="object-cover w-full h-full"
            />
          </motion.div>
        );
      })}
    </div>
  );
};