import connectMongoDB from "@/libs/mongoDB";
import Book from "@/models/book";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const {
    newName: name,
    newDesc: description,
    newImgURL: imgURL,
    newAuthor: author,
  } = await request.json();
  await connectMongoDB();
  await Book.findByIdAndUpdate(id, { name, description, imgURL, author });
  return NextResponse.json({ message: "book updated" }, { status: 200 });
}

export async function GET(req: any, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const book = await Book.findOne({ _id: id });
  return NextResponse.json({ book }, { status: 200 });
}
