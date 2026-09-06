import type { LucideIcon } from "lucide-react";

export interface FeatureData {
  id: number;

  icon: LucideIcon;

  title: string;

  description: string;
}

export interface FeatureCardProps {
  feature: FeatureData;
}

export interface FeatureGridProps {
  features: FeatureData[];
}