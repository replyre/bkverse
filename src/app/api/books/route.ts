import connectMongoDB from "@/libs/mongoDB";
import Book from "@/models/book";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { name, author, imgURL, description } = await request.json();
  await connectMongoDB();
  await Book.create({ name, author, imgURL, description });
  return NextResponse.json({ message: "Book Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const books = await Book.find();
  return NextResponse.json({ books }, { status: 200 });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Book.findByIdAndDelete(id);
  return NextResponse.json({ message: "Book Deleted" }, { status: 201 });
}
