import React from "react";
import { CardStack } from "@/components/ui/card-stack";

const ImpactSection = () => {
  const impactStats = [
    { number: "3400+", label: "Girls Empowered in Life Skills" },
    { number: "320+", label: "Young Mothers Rescued" },
    { number: "1870+", label: "Mama Kits Distributed" },
    { number: "650+", label: "Re-Usable Sanitary Kits Donated" },
    { number: "450+", label: "Community Outreaches" },
    { number: "580+", label: "Medical Support" },
    { number: "479+", label: "Girls Counselled" },
    { number: "298+", label: "Family Reunifications" },
  ];

  const cardStackImages = [
    { id: 1, src: "/images/impact-1.jpg", alt: "Community Impact" },
    { id: 2, src: "/images/our-programs-1.jpg", alt: "Education Program" },
    { id: 3, src: "/images/our-programs-2.jpg", alt: "Healthcare Initiative" },
    { id: 4, src: "/images/our-programs-3.jpg", alt: "Empowerment Workshop" },
    { id: 5, src: "/images/our-programs-4.jpg", alt: "Community Gathering" },
  ];

  return (
    <section
      className="py-16 px-4 text-white"
      style={{ backgroundColor: "rgb(175 136 126)" }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title" style={{ color: "white" }}>
            Our Impact
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle text-xl" style={{ color: "white" }}>
            Through our programs and partnerships, we've made a significant
            difference in communities we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center fade-in">
              <div className="text-4xl md:text-5xl mb-2 font-extrabold">
                {stat.number}
              </div>
              <div className="text-xl">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className=" rounded-lg p-8 fade-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 w-full text-xl">
              <h3 className="text-2xl font-extrabold mb-4 text-primary">
                <span className="text-white">Transforming Lives</span> by the
                Power of Love
              </h3>

              <blockquote className="text-lg md:text-lg font-bold text-gray-800 italic border-l-4 border-red-600 pl-4 pt-5 mb-5">
                <span className="font-extrabold">
                  Empowering girls and women
                </span>{" "}
                to overcome challenges by providing{" "}
                <span className="font-extrabold">
                  skills, education, and opportunity
                </span>{" "}
                through our programs.
              </blockquote>

              <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 italic border-l-4 border-red-600 pl-4 pt-5 mb-5">
                <span className="text-primary font-extrabold">Love</span> is the
                most excellent way to change and restore lives.
              </blockquote>

              <blockquote className="text-lg md:text-lg font-bold text-gray-800 italic border-l-4 border-red-600 pl-4 pt-5 mb-5">
                As a{" "}
                <span className="font-extrabold">Christian organization</span>,
                we believe in reuniting people with their greatest lover —
                <span className="font-extrabold"> God</span> — and helping them
                grow through discipleship.
              </blockquote>

              <blockquote className="text-lg md:text-lg font-bold text-gray-800 italic border-l-4 border-red-600 pl-4 pt-5 mb-5">
                <span className="font-bold">
                  We serve people from all religions and faith is never
                  mandatory for our beneficiaries.
                </span>
              </blockquote>
            </div>
            <div className="md:w-1/2 w-full pt-10">
              <CardStack items={cardStackImages} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
