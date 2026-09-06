export interface BlogData {
  _id: string;

  title: string;

  slug: string;

  excerpt: string;

  featuredImage: string;

  author: string;

  readTime: number;

  featured: boolean;

  publishedAt: string;

  category: {
    _id: string;

    name: string;

    slug: string;
  };
}

export interface BlogCardProps {
  blog: BlogData;
}

export interface BlogGridProps {
  blogs: BlogData[];
}

export interface LatestBlogsProps {
  blogs: BlogData[];
}