import connectDB from "@/lib/db";

import Booking from "@/models/booking.model";
import Category from "@/models/category.model";
import Destination from "@/models/destination.model";
import FAQ from "@/models/faq.model";
import Hotel from "@/models/hotel.model";
import Blog from "@/models/blog.model";
import Package from "@/models/package.model";
import Testimonial from "@/models/testimonial.model";
import Inquiry from "@/models/Inquiry";

import type { InquiryStatus } from "@/lib/inquiry/inquiry-status";

/* ========================================================================= */
/* Types                                                                     */
/* ========================================================================= */

export interface DashboardStats {
  content: {
    destinations: number;
    packages: number;
    hotels: number;
    categories: number;
    blogs: number;
    faqs: number;
    testimonials: number;
  };

  inquiries: {
    total: number;
    pending: number;
    contacted: number;
    quoted: number;
    confirmed: number;
    cancelled: number;
  };

  bookings: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export interface DashboardInquiry {
  _id: string;
  inquiryNumber: string;
  fullName: string;
  phone: string;
  email: string;
  destination: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  travelDate: string;
  travelers: number;
  budget: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface DashboardBooking {
  _id: string;
  bookingNumber: string;
  customerName: string;
  phone: string;
  email: string;
  package: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  packageSnapshot: {
    name: string;
    slug: string;
    duration: string;
    originalPrice: number;
    discountedPrice: number;
  } | null;
  travelDate: string;
  adults: number;
  children: number;
  total: number;
  bookingStatus:
    | "pending"
    | "confirmed"
    | "cancelled"
    | "completed";
  paymentStatus:
    | "pending"
    | "advance_paid"
    | "paid"
    | "refunded";
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentInquiries: DashboardInquiry[];
  recentBookings: DashboardBooking[];
}

/* ========================================================================= */
/* Helpers                                                                   */
/* ========================================================================= */

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function toISOStringSafe(value: unknown): string {
  if (!value) return "";

  if (value instanceof Date) {
    return value.toISOString();
  }

  const date = new Date(String(value));

  return Number.isNaN(date.getTime())
    ? ""
    : date.toISOString();
}

/* ========================================================================= */
/* Dashboard Stats                                                           */
/* ========================================================================= */

async function getDashboardStats(): Promise<DashboardStats> {
  const [
    destinations,
    packages,
    hotels,
    categories,
    blogs,
    faqs,
    testimonials,

    totalInquiries,
    pendingInquiries,
    contactedInquiries,
    quotedInquiries,
    confirmedInquiries,
    cancelledInquiries,

    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
  ] = await Promise.all([
    Destination.countDocuments({}),
    Package.countDocuments({}),
    Hotel.countDocuments({}),
    Category.countDocuments({}),
    Blog.countDocuments({}),
    FAQ.countDocuments({}),
    Testimonial.countDocuments({}),

    Inquiry.countDocuments({}),
    Inquiry.countDocuments({ status: "pending" }),
    Inquiry.countDocuments({ status: "contacted" }),
    Inquiry.countDocuments({ status: "quoted" }),
    Inquiry.countDocuments({ status: "confirmed" }),
    Inquiry.countDocuments({ status: "cancelled" }),

    Booking.countDocuments({}),
    Booking.countDocuments({ bookingStatus: "pending" }),
    Booking.countDocuments({ bookingStatus: "confirmed" }),
    Booking.countDocuments({ bookingStatus: "completed" }),
    Booking.countDocuments({ bookingStatus: "cancelled" }),
  ]);

  return {
    content: {
      destinations,
      packages,
      hotels,
      categories,
      blogs,
      faqs,
      testimonials,
    },

    inquiries: {
      total: totalInquiries,
      pending: pendingInquiries,
      contacted: contactedInquiries,
      quoted: quotedInquiries,
      confirmed: confirmedInquiries,
      cancelled: cancelledInquiries,
    },

    bookings: {
      total: totalBookings,
      pending: pendingBookings,
      confirmed: confirmedBookings,
      completed: completedBookings,
      cancelled: cancelledBookings,
    },
  };
}

/* ========================================================================= */
/* Recent Inquiries                                                          */
/* ========================================================================= */

async function getRecentInquiries(): Promise<
  DashboardInquiry[]
> {
  const inquiries = await Inquiry.find({})
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .select(
      [
        "inquiryNumber",
        "fullName",
        "phone",
        "email",
        "destination",
        "travelDate",
        "travelers",
        "budget",
        "status",
        "createdAt",
      ].join(" "),
    )
    .populate({
      path: "destination",
      select: "_id name slug",
    })
    .lean();

  const normalized = inquiries.map((inquiry) => {
    /*
     * Mongoose's lean + populate typing can leave the populated
     * reference typed as ObjectId even though runtime data is an object.
     *
     * Normalize it explicitly before building the dashboard DTO.
     */
    const destination =
      inquiry.destination as unknown as
        | {
            _id: unknown;
            name?: string;
            slug?: string;
          }
        | null
        | undefined;

    return {
      _id: String(inquiry._id),

      inquiryNumber: String(
        inquiry.inquiryNumber ?? "",
      ),

      fullName: String(
        inquiry.fullName ?? "",
      ),

      phone: String(
        inquiry.phone ?? "",
      ),

      email: String(
        inquiry.email ?? "",
      ),

      destination: destination
        ? {
            _id: String(destination._id),
            name: String(destination.name ?? ""),
            slug: String(destination.slug ?? ""),
          }
        : null,

      travelDate: toISOStringSafe(
        inquiry.travelDate,
      ),

      travelers: Number(
        inquiry.travelers ?? 0,
      ),

      budget: String(
        inquiry.budget ?? "",
      ),

      status: inquiry.status as InquiryStatus,

      createdAt: toISOStringSafe(
        inquiry.createdAt,
      ),
    };
  });

  return serialize<DashboardInquiry[]>(
    normalized,
  );
}

/* ========================================================================= */
/* Recent Bookings                                                           */
/* ========================================================================= */

async function getRecentBookings(): Promise<
  DashboardBooking[]
> {
  const bookings = await Booking.find({})
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .select(
      [
        "bookingNumber",
        "customerName",
        "phone",
        "email",
        "package",
        "packageSnapshot",
        "travelDate",
        "adults",
        "children",
        "pricing",
        "bookingStatus",
        "paymentStatus",
        "createdAt",
      ].join(" "),
    )
    .populate({
      path: "package",
      select: "_id name slug",
    })
    .lean();

  const normalized = bookings.map((booking) => {
    const packageRef =
      booking.package as unknown as
        | {
            _id: unknown;
            name?: string;
            slug?: string;
          }
        | null
        | undefined;

    const packageSnapshot =
      booking.packageSnapshot as
        | {
            name?: string;
            slug?: string;
            duration?: string;
            originalPrice?: number;
            discountedPrice?: number;
          }
        | null
        | undefined;

    const pricing =
      booking.pricing as
        | {
            total?: number;
          }
        | null
        | undefined;

    const normalizedPackage =
      packageRef
        ? {
            _id: String(packageRef._id),
            name: String(
              packageRef.name ?? "",
            ),
            slug: String(
              packageRef.slug ?? "",
            ),
          }
        : null;

    const normalizedSnapshot =
      packageSnapshot
        ? {
            name: String(
              packageSnapshot.name ?? "",
            ),
            slug: String(
              packageSnapshot.slug ?? "",
            ),
            duration: String(
              packageSnapshot.duration ?? "",
            ),
            originalPrice: Number(
              packageSnapshot.originalPrice ?? 0,
            ),
            discountedPrice: Number(
              packageSnapshot.discountedPrice ?? 0,
            ),
          }
        : null;

    return {
      _id: String(booking._id),

      bookingNumber: String(
        booking.bookingNumber ?? "",
      ),

      customerName: String(
        booking.customerName ?? "",
      ),

      phone: String(
        booking.phone ?? "",
      ),

      email: String(
        booking.email ?? "",
      ),

      package: normalizedPackage,

      packageSnapshot:
        normalizedSnapshot,

      travelDate: toISOStringSafe(
        booking.travelDate,
      ),

      adults: Number(
        booking.adults ?? 0,
      ),

      children: Number(
        booking.children ?? 0,
      ),

      total: Number(
        pricing?.total ?? 0,
      ),

      bookingStatus:
        booking.bookingStatus as
          | "pending"
          | "confirmed"
          | "cancelled"
          | "completed",

      paymentStatus:
        booking.paymentStatus as
          | "pending"
          | "advance_paid"
          | "paid"
          | "refunded",

      createdAt: toISOStringSafe(
        booking.createdAt,
      ),
    };
  });

  return serialize<DashboardBooking[]>(
    normalized,
  );
}

/* ========================================================================= */
/* Main Dashboard Data                                                       */
/* ========================================================================= */

export async function getDashboardData(): Promise<
  DashboardData
> {
  await connectDB();

  const [
    stats,
    recentInquiries,
    recentBookings,
  ] = await Promise.all([
    getDashboardStats(),
    getRecentInquiries(),
    getRecentBookings(),
  ]);

  return {
    stats,
    recentInquiries,
    recentBookings,
  };
}