"use client";
import "./styles/home.css";

import Link from "next/link";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
interface Book {
  name: string;
  author: string;
  imgURL: string;
  description: string;
  createdAt: string;
  _id: string;
}
export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
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
      const sortedBooks = data.books.sort(
        (a: Book, b: Book) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setBooks(data.books);
    } catch (error) {
      console.error("Error loading books: ", error);
    }
  };
  console.log(books);
  return (
    <div className="flex min-h-screen flex-col justify-between py-10 px-5 sm:p-24">
      <nav className=" flex justify-between  items-center">
        <p className="text-4xl font-bold font-mono cursor-pointer">Replyr's</p>
        <a href="https://rahul-gupta-portfolio.vercel.app/" target="_blank">
          <button className="cssbuttons-io-button">
            Website
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </a>
      </nav>
      <section className=" bg-[url('/home.jpg')] rounded-lg my-5">
        <div className="bookverse py-2 bg-gradient-to-r from-white from-5% to-transparent hover:bg-gradient-to-tr  hover:rom-white hover:from-15% hover:to-transparent">
          <p className="bookverse2 sm:text-[16vw] text-[17.5vw] flex text-center">
            BookVerse
          </p>
          <p className="bookverse1 sm:text-[16vw] text-[17.5vw] flex text-center ">
            BookVerse
          </p>
        </div>
      </section>
      <section className="buttons self-end">
        <Link href="/addBook">
          <button className=" hover:bg-red-600 hover:text-white"> + ADD</button>
        </Link>
        <Link href="/viewBook">
          {" "}
          <button className=" hover:bg-blue-600 hover:text-white">
            View/Edit
          </button>
        </Link>
      </section>
      <section>
        <p className="text-4xl my-4">Latest Books: </p>

        <Carousel responsive={responsive}>
          {books.length > 0 &&
            books.map((e) => {
              return (
                <div
                  key={e._id}
                  style={{
                    background: `url(${e.imgURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                  className={`h-[400px] w-[300px] flex flex-col justify-between rounded-br-xl rounded-tr-xl cover`}
                >
                  <div>
                    <p className="opacity-0 text-2xl p-4 text-white rounded-tr-xl ">
                      {e.name}
                    </p>
                    <p className="opacity-0 author p-4 text-white text-right ">
                      -{e.author}
                    </p>
                  </div>

                  <p className="opacity-0 text-lg text-white rounded-br-xl  text-justify p-4">
                    {e.description}
                  </p>
                </div>
              );
            })}
        </Carousel>
        {books.length === 0 && <ContentLoader />}
      </section>
      <section className="flex justify-between text-lg md:text-4xl font-bold mt-20">
        <p>Total Books: {books.length || "---"}</p>
        <span className="flex items-center">
          <a href="mailto:replyrgupta@gmail.com" target="_blank">
            Rahul Gupta
          </a>{" "}
          <a href="https://github.com/replyre" target="_blank">
            <FaGithubSquare className="md:text-5xl ml-3" />
          </a>{" "}
          <a href="https://www.linkedin.com/in/replyr/" target="_blank">
            <FaLinkedin className=" md:text-5xl ml-3" />
          </a>{" "}
        </span>
      </section>
    </div>
  );
}
