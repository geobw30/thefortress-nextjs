import ImpactSection from "@/components/sections/ImpactSection";
import React from "react";

const ImpactPage = () => {
  const stories = [
    {
      title: "Dream come true!",
      excerpt:
        "I was born a Muslim and lived a muslim my entire life until I got a chance to be rescued at the fortress. During my childhood at around the age of 7years I was raped by my uncle who was an HIV victim but i somehow escaped contracting the HIV. My mother who was a very busy lady with work had little time with us as children and always we felt ...",
      image: "/images/success-1.jpg",
      id: 1,
    },
    {
      title: "Prevention is better than cure",
      excerpt:
        "Prevention is better than cure is a very old saying/ proverb but thinking about it really, it's so true. As the Fortress, we have seen the transformation of every young mother that we rescue, rehabilitation and empower in different ways. However, in addition to that, we realize that we need to put an extra effort in prevention of teenange pregnancy ...",
      image: "/images/success-2.jpg",
      id: 2,
    },
    {
      title: "The Joy of the Harvest",
      excerpt:
        'Part of our National Anthem says "Oh Uganda the land that feeds us, with SUN and fertlie crops Grown…Now that we are older, we realize that indeed Uganda is blessed with beautifull weather and fertile soil. Well at the Fortress, we get to grow vegetables, maize, sugar cane, beans and planted several fruit trees that we are starting to enjoy like paw paws ...',
      image: "/images/success-3.jpg",
      id: 3,
    },
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <ImpactSection />
        
      </div>
    </div>
  );
};

export default ImpactPage;
