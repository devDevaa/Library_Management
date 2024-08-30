import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BookImage from "../assets/images.jpg";
import useTheme from "../hooks/useTheme";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import NoteForm from "../components/NoteForm";

export default function BookDetail() {
  // dynamic id
  let { id } = useParams();

  // let { data : book, loading , error} = useFetch(`http://localhost:3000/books/${id}`)

  let { isDark } = useTheme();

  // =-=-=-=-= firebase =-=-=-=-=
  let [error, setError] = useState("");
  let [book, setBook] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let ref = doc(db, "books", id);
    // real time communication
    onSnapshot(ref, (doc) => {
      if (doc.exists) {
        let book = { id: doc.id, ...doc.data() };
        setBook(book);
        setLoading(false);
        setError("");
      } else {
        setError("no document found");
        setLoading(false);
      }
    });
    // getDoc(ref).then()
  }, [id]);
  // =-=-=-=-= firebase =-=-=-=-=

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading . . .</p>}
      {book && (
        <>
          <div className="grid grid-cols-2">
            <div className="">
              <img src={book.cover} className="w-[70%]" alt="" />
            </div>

            <div>
              <h1
                className={`text-3xl font-bold ${isDark ? "text-white" : ""}`}
              >
                {book.title}
              </h1>
              <div className="space-x-3 my-3">
                {book.categories.map((category) => (
                  <span
                    className="bg-blue-500 text-white rounded-full text-sm px-2 py-1"
                    key={category}
                  >
                    {category}
                  </span>
                ))}
              </div>
              <p className={`${isDark ? "text-white" : ""}`}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatem modi illo quod expedita, corrupti tempora
                voluptatibus suscipit ea asperiores, eius deserunt velit omnis
                adipisci! Itaque vitae dolor sapiente perspiciatis incidunt.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="font_bold text-xl font-bold text-primary my-3 text-center">
              My Note
            </h3>
            <NoteForm></NoteForm>
            <div className="border-2 shadow-md p-3 my-3">
              <div className="flex space-x-3">
                <img
                  className=" w-12 h-12 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&s"
                  alt=""
                />
                <div>
                  <h3>John Doe</h3>
                  <div className="text-gray-400">20.6.2024</div>
                </div>
              </div>
              <div className="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae itaque ipsa officia dolore voluptas ratione provident
                aliquid nihil deserunt sunt eos repellendus incidunt debitis
                non, dolorum error? Id, nobis cum.
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
