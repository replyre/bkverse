"use client";
import {
  ArrowCircleLeftIcon,
  PencilAltIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import toast, { Toaster } from "react-hot-toast";
interface Book {
  name: string;
  author: string;
  imgURL: string;
  description: string;
}
const getBook = async (
  id: string,
  setBookData: React.Dispatch<React.SetStateAction<Book>>
) => {
  try {
    const res = await fetch(`https://bkverse.vercel.app/api/books/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      toast.error("Failed to fetch Book");
      throw new Error("Failed to fetch Book");
    }
    const data = await res.json();
    setBookData(data.book);
  } catch (err) {
    toast.error("Failed to fetch Book");
    console.log(err);
  }
};

const EditBook = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();
  const [BookData, setBookData] = useState<Book>({
    name: "",
    author: "",
    description: "",
    imgURL: "",
  });
  useEffect(() => {
    getBook(id, setBookData);
  }, []);
  //   console.log(BookData);
  const validateForm = () => {
    const { name, author, description, imgURL } = BookData;
    const errors = [];
    if (!name) errors.push("Book name is required.");
    if (!author) errors.push("Author is required.");
    if (!description) errors.push("Description is required.");
    if (!imgURL) errors.push("Book cover is required.");

    if (errors.length > 0) {
      toast.error(errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch(`https://bkverse.vercel.app/api/books/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newName: BookData.name,
            newAuthor: BookData.author,
            newImgURL: BookData.imgURL,
            newDesc: BookData.description,
          }),
        });
        if (res.ok) {
          toast.success("Book updated Successfully");
          router.push("/viewBook");
        } else {
          throw new Error("Failed to create the Book");
        }
      } catch (error) {
        toast.error("Failed to create the Book");
        console.log(error);
      }
      //   console.log("Form submitted", BookData);
    }
  };

  console.log(BookData);
  return (
    <div className="min-h-screen p-24 ">
      <p className="md:pl-20  md:text-left text-center mb-2 text-lg  font-bold">
        Edit Book Details:
      </p>
      {BookData.name !== "" ? (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-20  !text-black">
          <form
            className="w-80 max-w-[300px] border-2 p-5 rounded"
            style={{ boxShadow: "5px 5px 1px 2px black" }}
            onSubmit={handleSubmit}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="book_name"
                id="book_name"
                className="block py-2.5 px-0 w-full text-sm !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={BookData.name}
                onChange={(e) => {
                  setBookData({ ...BookData, name: e.target.value });
                }}
              />
              <label
                htmlFor="book_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Book Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="author"
                id="author"
                className="block py-2.5 px-0 w-full text-sm !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={BookData.author}
                onChange={(e) => {
                  setBookData({ ...BookData, author: e.target.value });
                }}
              />
              <label
                htmlFor="author"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Author
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                name="description"
                id="description"
                rows={4}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={BookData.description}
                onChange={(e) => {
                  setBookData({ ...BookData, description: e.target.value });
                }}
              />
              <label
                htmlFor="description"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Book Description
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group ">
              <input
                type="text"
                name="cover"
                id="cover"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
                value={BookData.imgURL}
                onChange={(e) => {
                  setBookData({ ...BookData, imgURL: e.target.value });
                }}
              />
              <label
                htmlFor="cover"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Book Cover(Image URL)
              </label>
            </div>
            <div className="flex justify-between">
              <button
                className="button-54 flex gap-2 items-center hover:bg-blue-400"
                onClick={handleSubmit}
              >
                <PencilAltIcon width={24} />
                Edit
              </button>
              <Link href={"/viewBook"}>
                <div
                  className="button-54 flex items-center gap-2"
                  role="button"
                >
                  <ArrowCircleLeftIcon className="w-6" /> Back
                </div>
              </Link>
            </div>
          </form>
          {BookData.imgURL && (
            <div className="min-w-80 flex justify-center">
              <img
                src={BookData.imgURL}
                alt="Book Cover Preview"
                className="h-[400px]  rounded-br-lg rounded-tr-lg"
              />
            </div>
          )}
          {!BookData.imgURL && (
            <div className="min-w-80 flex justify-center">
              <img
                src={
                  "https://i.pinimg.com/originals/59/dd/5a/59dd5a6ec1c29fa87afa5d722cc19233.jpg"
                }
                alt="Book Cover Preview"
                className="h-[400px] rounded-br-lg rounded-tr-lg"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="p-20">
          <ContentLoader />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default EditBook;
