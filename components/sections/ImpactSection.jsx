"use client";
import React from "react";
import {
  Heart,
  Users,
  Gift,
  Activity,
  HelpingHand,
  Smile,
  Home,
} from "lucide-react";
import ImpactStats from "./ImpactStats";

const ImpactSection = () => {
  const stats = [
    { icon: <Users />, number: 3400, label: "Girls Empowered in Life Skills" },
    { icon: <Heart />, number: 320, label: "Young Mothers Rescued" },
    { icon: <Gift />, number: 1870, label: "Mama Kits Distributed" },
    {
      icon: <HelpingHand />,
      number: 650,
      label: "Re-Usable Sanitary Kits Donated",
    },
    { icon: <Activity />, number: 450, label: "Community Outreaches" },
    { icon: "", number: 580, label: "Medical Support" },
    { icon: <Smile />, number: 479, label: "Girls Counselled" },
    { icon: <Home />, number: 298, label: "Family Reunifications" },
  ];

  return <ImpactStats stats={stats} />;
};

export default ImpactSection;
