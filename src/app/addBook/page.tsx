"use client";
import { ArrowCircleLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddBook = () => {
  const [BookData, setBookData] = useState({
    name: "",
    author: "",
    description: "",
    imgURL: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { name, author, description, imgURL } = BookData;
    const errors = [];
    if (!name) errors.push("Book name is required.");
    if (!author) errors.push("Author is required.");
    if (!description) errors.push("Description is required.");
    if (!imgURL) errors.push("Book cover is required.");

    if (errors.length > 0) {
      errors.map((e) => {
        toast.error(e);
      });

      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    console.log("hi");

    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch("http://localhost:3000/api/books", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: BookData.name,
            author: BookData.author,
            imgURL: BookData.imgURL,
            description: BookData.description,
          }),
        });
        if (res.ok) {
          toast.success("Book added Successfully");
          setBookData({
            name: "",
            author: "",
            description: "",
            imgURL: "",
          });
        } else {
          setBookData({
            name: "",
            author: "",
            description: "",
            imgURL: "",
          });
          throw new Error("Failed to create the Book");
        }
      } catch (error) {
        console.log(error);
      }
      console.log("Form submitted", BookData);
    }
    setLoading(false);
  };

  console.log(BookData);
  return (
    <div className="min-h-screen p-24 ">
      <p className="md:pl-20  md:text-left text-center mb-2 text-lg  font-bold">
        Add Book Details
      </p>
      <div className="flex-col-reverse md:flex-row flex justify-center items-center gap-20  !text-black">
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
              value={BookData.author}
              className="block py-2.5 px-0 w-full text-sm !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
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
              value={BookData.description}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
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
              value={BookData.imgURL}
              required
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
              className="button-54 flex gap-2 items-center hover:bg-green-400 disabled:cursor-not-allowed text-grey-300 disabled:hover:bg-gray-400"
              onClick={handleSubmit}
              disabled={loading}
            >
              <PlusCircleIcon width={24} />
              Add
            </button>
            <Link href={"/"}>
              <button
                className="button-54 flex items-center gap-2"
                role="button"
              >
                <ArrowCircleLeftIcon className="w-6" /> Back
              </button>
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
      <Toaster />
    </div>
  );
};

export default AddBook;
