export interface CTAStat {
  value: string;
  label: string;
}

export interface CTAContentProps {
  badge: string;
  title: string;
  highlightedText: string;
  description: string;
}

export interface CTAButtonsProps {
  primaryHref: string;
  secondaryHref: string;
}

export interface CTAStatsProps {
  stats: CTAStat[];
}