import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel"; 
import { connectToDB } from "@/utils/db";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Connect to the database
    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
