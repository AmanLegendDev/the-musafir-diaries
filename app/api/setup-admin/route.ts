import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const email = "admin@themusafirdiaries.com";
    const password = "TMD!Admin#2026@Secure";

    const existingAdmin = await User.findOne({
      email,
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: "The Musafir Diaries Admin",
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully.",
      credentials: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error("Admin Setup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create admin account.",
      },
      {
        status: 500,
      }
    );
  }
}