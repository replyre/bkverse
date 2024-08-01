import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the book document
interface IBook extends Document {
  name: string;
  author: string;
  imgURL: string;
  description: string;
}

// Define the schema
const bookSchema = new Schema<IBook>(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    imgURL: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create the model
const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);

export default Book;
