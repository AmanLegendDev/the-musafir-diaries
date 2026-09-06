import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@altitudeescapes.com",
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash("Admin@12345", 12);

    await User.create({
      name: "Administrator",
      email: "admin@altitudeescapes.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully.",
      credentials: {
        email: "admin@altitudeescapes.com",
        password: "Admin@12345",
      },
    });
  } catch (error) {
    console.error(error);

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