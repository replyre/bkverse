"use client";

import React, { useEffect, useState } from "react";

import {
  ArrowCircleLeftIcon,
  PencilAltIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import ContentLoader from "react-content-loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Book {
  name: string;
  author: string;
  imgURL: string;
  description: string;
  _id: string;
}
const ViewBook = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBooks(setBooks);
  }, []);

  const getBooks = async (
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>
  ) => {
    try {
      const res = await fetch("https://bkverse.vercel.app/api/books", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await res.json();
      setBooks(data.books);
    } catch (error) {
      toast.error("Failed to fetch books");
      console.error("Error loading books: ", error);
    }
  };

  const removeBook = async (id: string) => {
    setLoading(true);
    const confirmed = confirm("Are you sure");

    if (confirmed) {
      try {
        const res = await fetch(
          `https://bkverse.vercel.app/api/books?id=${id}`,
          {
            method: "Delete",
          }
        );

        if (res.ok) {
          toast.success("book deleted");
          router.refresh();
        } else {
          throw new Error("Error deleting the book");
        }
      } catch (err) {
        toast.error("Error deleting the book");
        console.log(err);
      }
    }

    setLoading(false);
  };
  return (
    <div className="sm:p-24 p-10 ">
      <p className="text-xl font-extrabold flex items-center justify-between">
        All Books:{" "}
        <Link href={"/"}>
          <button className="button-54 flex items-center gap-2" role="button">
            <ArrowCircleLeftIcon className="w-6" /> Back
          </button>
        </Link>
      </p>
      {books.length > 0 && (
        <>
          <div className="p-4 overflow-x-auto sm:block hidden">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="">
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Cover
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <thead className="sm:hidden">
                <tr>
                  <th className="border-b-2">Book Details</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index} className="">
                    <td className=" row-span-3 px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <img
                        src={book.imgURL}
                        alt="Book Cover Preview"
                        className="w-16 h-24 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {book.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {book.description}
                    </td>
                    <td className="col-span-2  px-6 py-4 whitespace-no-wrap   border-b-4 sm:border-b border-gray-200">
                      <div className="flex space-x-4 justify-evenly items-center">
                        <Link href={`/editBook/${book._id}`} className="flex">
                          <button
                            className="text-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:text-slate-500"
                            disabled={loading}
                          >
                            <PencilAltIcon className="h-5 w-5" />
                          </button>
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:text-slate-500"
                          onClick={() => removeBook(book._id)}
                          disabled={loading}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 overflow-x-auto sm:hidden">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="sm:hidden">
                <tr>
                  <th className="border-b-2">Book Details</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={index}
                    className="grid grid-cols-2 auto-rows-auto items-center"
                  >
                    <td className=" row-span-3 px-6 py-4 whitespace-no-wrap ">
                      <img
                        src={book.imgURL}
                        alt="Book Cover Preview"
                        className="w-24 h-34 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b ">
                      {book.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap  border-b ">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-justify">
                      {book.description}
                    </td>
                    <td className="col-span-2  px-6 py-4 whitespace-no-wrap   border-b-4 sm:border-b border-gray-200">
                      <div className="flex space-x-4 justify-evenly">
                        <Link href={`/editBook/${book._id}`}>
                          <button
                            className="text-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:text-slate-500"
                            disabled={loading}
                          >
                            <PencilAltIcon className="h-5 w-5" />
                          </button>
                        </Link>{" "}
                        <button
                          className="text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:text-slate-500"
                          onClick={() => removeBook(book._id)}
                          disabled={loading}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {books.length === 0 && (
        <>
          <ContentLoader />
          <ContentLoader />
          <ContentLoader />
          <ContentLoader />
          <ContentLoader />
        </>
      )}
      <Toaster />
    </div>
  );
};

export default ViewBook;
