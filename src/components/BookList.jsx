import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useLocation} from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { db } from "../firebase";
import { Firestore, collection, deleteDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import delete_icon from '../assets/delete_icon.svg';
import edit_icon from '../assets/edit_icon.svg';

export default function BookList() {

  // let location = useLocation();
  // let params = new URLSearchParams(location.search);
  // let search = params.get('search');

  // let { data: books, loading, error } = useFetch(`http://localhost:3000/books?q=${search? `?q=${search}` : ''}`);
  
  // =-=-=-=-= firebase =-=-=-=-=
  let [error, setError] = useState('');
  let [books, setBooks] = useState([]);
  let [loading, setLoading] = useState(false);

  // delete book from Firestore
  let deleteBook = async (e, id) => {
    e.preventDefault();
    let ref = doc(db, 'books', id);
    await deleteDoc(ref);
    // setBooks(prev => prev.filter(book => book.id !== id))
  }

  useEffect(function() {
    // loading handle
    setLoading(true);
    //  take collection (data) reference
    let ref = collection(db, 'books');

    let q = query(ref, orderBy('date', 'desc'))
    // on snap shot make real time communication
    onSnapshot(q, docs => {
      if(docs.empty) {
        // error handle
        setError('no result found')
      } else {
        let books = [];
        docs.forEach(doc => {
          let book = { id: doc.id, ...doc.data() }
          books.push(book);
        })
        setBooks(books)

        setLoading(false);
        setError('');
      }
    })
    // getDocs(q).then()
  }, [])
  // =-=-=-=-= firebase =-=-=-=-=
  
  if(error) {
    return <p>{error}</p>
  }

  let {isDark} = useTheme();

  return (
    <div>
        {loading && <p>loading . . . </p>}

        {/* Book List */}
        {!!books && (
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-3  ">
            {books.map((book) => (
              <Link to={`books/${book.id}`} key={book.id}>
                <div key={book.id} className={`p-3 border rounded-md bg-slate-50 ${isDark ? 'bg-dcard border-primary' : ''}`}>
                  <img src={book.cover} alt="" />
                  <div className="text-center space-y-2 mt-3 py-2  rounded-sm">
                    <h1 className={`text-xl ${isDark ? 'text-white' : ''}`}>{book.title}</h1>
                    <p className={`${isDark ? 'text-white' : ''}`}>{book.description}</p>

                    <div className="flex flex-wrap justify-between items-center">
                      <div className="">
                        {book.categories.map((genre) => (
                          <span key={genre} className="border bg-cyan-900 border-white text-white my-1 mx-1 px-2 py-1 rounded-full ">
                            {genre}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-1" >
                        <Link to={`/edit/${book.id}`}>
                          <img src={edit_icon} alt="" />
                        </Link>
                        <img src={delete_icon} alt="" onClick={(e) => deleteBook(e, book.id)}/>
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            ))}
            {books && !books.length && <p>no search result found...</p> }
          </div>
        )}
    </div>
    
    
  );
}
