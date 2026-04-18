"use client";
import React from "react";
import Image from "next/image";
import {
  Heart,
  Users,
  Gift,
  Activity,
  BriefcaseMedical,
  Smile,
  Home,
  Wrench,
} from "lucide-react";
import ImpactStats from "./ImpactStats";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const ImpactSection = () => {
  const stats = [
    {
      icon: (
        <Image
          src="/images/sanitary-napkin.png"
          alt="Sanitary napkin kit"
          width={150}
          height={150}
          className="object-contain"
        />
      ),
      number: 850,
      label: "Dignity kits given to girls with menstrual hygiene trainings",
    },
    {
      icon: <Wrench size={150} strokeWidth={0.75} />,
      number: 4700,
      label: "Girls Empowered with Life Skills",
    },
    {
      icon: <Heart size={150} strokeWidth={0.75} />,
      number: 380,
      label:
        "Pregnant girls rescued, given medical care, shelter & supported through Child birth",
    },
    {
      icon: <Gift size={150} strokeWidth={0.75} />,
      number: 2879,
      label: "Mama Kits distributed for safe Child birth",
    },
    {
      icon: <Activity size={150} strokeWidth={0.75} />,
      number: 1650,
      label: "Community Outreaches",
    },
    {
      icon: <BriefcaseMedical size={150} strokeWidth={0.75} />,
      number: 580,
      label: "Medical Support",
    },
    {
      icon: <Smile size={150} strokeWidth={0.75} />,
      number: 1800,
      label: "Girls and Women Counselled",
    },
    {
      icon: <Home size={150} strokeWidth={0.75} />,
      number: 370,
      label: "Family Re-unifications facilitated",
    },
    {
      icon: <Users size={150} strokeWidth={0.75} />,
      number: 6,
      label:
        "Women & Girls Conferences and Trainings regarding Parenting Skills, Nutrition, Self worth and Financial empowerment",
    },
  ];

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <ImpactStats
      stats={stats}
      shouldAnimate={isIntersecting}
      ref={elementRef}
    />
  );
};

export default ImpactSection;
