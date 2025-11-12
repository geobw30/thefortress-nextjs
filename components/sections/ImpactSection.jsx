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
} from "lucide-react";
import ImpactStats from "./ImpactStats";

const ImpactSection = () => {
  const stats = [
    { icon: <Users size={100} strokeWidth={0.75}/>, number: 3400, label: "Girls Empowered in Life Skills" },
    { icon: <Heart size={100} strokeWidth={0.75}/>, number: 320, label: "Young Mothers Rescued" },
    { icon: <Gift size={100} strokeWidth={0.75}/>, number: 1870, label: "Mama Kits Distributed" },
    {
      icon: <HelpingHand size={100} strokeWidth={0.75}/>,
      number: 650,
      label: "Re-Usable Sanitary Kits Donated",
    },
    { icon: <Activity size={100} strokeWidth={0.75}/>, number: 450, label: "Community Outreaches" },
    { icon: <BriefcaseMedical size={100} strokeWidth={0.75}/>, number: 580, label: "Medical Support" },
    { icon: <Smile size={100} strokeWidth={0.75}/>, number: 479, label: "Girls Counselled" },
    { icon: <Home size={100} strokeWidth={0.75}/>, number: 298, label: "Family Reunifications" },
  ];

  return <ImpactStats stats={stats} />;
};

export default ImpactSection;
