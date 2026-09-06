export interface NavigationItem {
  title: string;
  href: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface SelectOption {
  label: string;
  value: string;
}