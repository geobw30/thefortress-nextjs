"use client";
import React from "react";
import {
  Heart,
  Users,
  Gift,
  Activity,
  BriefcaseMedical,
  HelpingHand,
  Smile,
  Home,
  Wrench
} from "lucide-react";
import ImpactStats from "./ImpactStats";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const ImpactSection = () => {
  const stats = [
    {
      icon: <Wrench size={200} strokeWidth={0.75} />,
      number: 4700,
      label: "Girls Empowered with Life Skills",
    },
    {
      icon: <Heart size={200} strokeWidth={0.75} />,
      number: 380,
      label:
        "Pregnant girls rescued, given medical care, shelter & supported through Child birth",
    },
    {
      icon: <Gift size={200} strokeWidth={0.75} />,
      number: 2879,
      label: "Mama Kits distributed for safe Child birth",
    },
    {
      icon: <HelpingHand size={200} strokeWidth={0.75} />,
      number: 850,
      label: "Re-sanitary kits given to girls with menstrual hygiene trainings",
    },
    {
      icon: <Activity size={200} strokeWidth={0.75} />,
      number: 1650,
      label: "Community Outreaches",
    },
    {
      icon: <BriefcaseMedical size={200} strokeWidth={0.75} />,
      number: 580,
      label: "Medical Support",
    },
    {
      icon: <Smile size={200} strokeWidth={0.75} />,
      number: 1800,
      label: "Girls and Women Counselled",
    },
    {
      icon: <Home size={200} strokeWidth={0.75} />,
      number: 370,
      label: "Family Re-unifications facilitated",
    },
    {
      icon: <Users size={200} strokeWidth={0.75} />,
      number: 6,
      label: "Women & Girls Conferences and Trainings regarding Parenting Skills, Nutrition, Self worth and Financial empowerment",
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
