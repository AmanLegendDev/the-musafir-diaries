import {
  LayoutDashboard,
  MapPinned,
  Package,
  FolderTree,
  CalendarCheck,
  MessageSquare,
  FileText,
  ImageIcon,
  Star,
  Users,
  Settings,
} from "lucide-react";

export const adminNavigation = [
  {
    title: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "CONTENT",
    items: [
      {
        label: "Destinations",
        href: "/admin/destinations",
        icon: MapPinned,
      },
      {
        label: "Packages",
        href: "/admin/packages",
        icon: Package,
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
      },
      {
        label: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
      },
      {
        label: "Gallery",
        href: "/admin/gallery",
        icon: ImageIcon,
      },
    ],
  },

  {
    title: "BUSINESS",
    items: [
      {
        label: "Bookings",
        href: "/admin/bookings",
        icon: CalendarCheck,
      },
      {
        label: "Inquiries",
        href: "/admin/inquiries",
        icon: MessageSquare,
      },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: Star,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        label: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];