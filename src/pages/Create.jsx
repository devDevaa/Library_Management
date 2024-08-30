import React, { useEffect, useState } from "react";
import useFetch from '../hooks/useFetch';
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Create() {
  let {id} = useParams();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newCategory, setNewCategory] = useState("");
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);

  // let {setPostData, data:book} = useFetch('http://localhost:3000/books/', "POST");

  // edit or create
  useEffect(() => {
    // edit form
    if (id) {
      setIsEdit(true);
      let ref = doc(db, 'books', id);
        getDoc(ref).then(doc => {
            if(doc.exists) {
              // destructure
              let {title, description, categories} = doc.data();
              setTitle(title);
              setDescription(description);
              setCategories(categories);
            }
        })

      // create form
    } else {
      setIsEdit(false);
      setTitle('');
      setDescription('');
      setCategories([]);
    }
  }, [])

  let navigate = useNavigate();

  let addCategory = (e) => {
    if(newCategory && categories.includes(newCategory)) {
      setNewCategory('')
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory("");
  };

  let uploadImgToFirebase = async(file) => {
    // upload book
    let uniqueFileName = Date.now().toString()+ "_" +file.name;
    let path = '/covers/' + uniqueFileName;
    let storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  // submit action
  let addBook = async (e) => {
    e.preventDefault();
    // upload book
    let url = await uploadImgToFirebase(file);
    let data = {
      title, 
      description,
      categories,
      date : serverTimestamp(),
      cover : url
    }

    // =-=-=-=-= firebase =-=-=-=-=
    // edit or create
    if (isEdit) {
      let ref = doc(db, 'books', id);
      await updateDoc(ref, data)
    } else {
      let ref = collection(db, 'books');
      await addDoc(ref, data)
    }
    navigate('/');
  }

  // if a book is created, redirect to home page
  // useEffect(() => {
  //   if(book) {
  //     navigate('/')
  //   }
  // }, [book])

  let {isDark} = useTheme();

  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState("");

  let handlePreviewImage = (file) => {
    let reader = new FileReader;
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result)
    }
  }

  let handlePhotochange = (e) => {
    setFile(e.target.files[0])
  }


  useEffect(() => {
    if(file) {
      handlePreviewImage(file)
    }
  }, [file]);

  return (
    <div className="h-screen">
      
    <form className="w-full max-w-lg mx-auto mt-4" onSubmit={addBook}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`}
            htmlFor="grid-password"
          >
            Book Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="book title"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`}
            htmlFor="grid-password"
          >
            Book Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="book descrition"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`}
            htmlFor="grid-password"
          >
            Category
          </label>
          <div className="flex items-center">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="category"
            />
            <button
              onClick={addCategory}
              type="button"
              className="bg-primary p-1 rounded-lg mb-3 mx-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {categories.map((genre) => (
          <span
            key={genre}
            className="border bg-cyan-900 border-white text-white my-1 mx-1 px-2 py-1 rounded-full "
          >
            {genre}
          </span>
        ))}
      </div>
      <div className="w-full px-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`}
            htmlFor="grid-password"
          >
            Book Cover
          </label>
          <input
            onChange={handlePhotochange}
            type="file"
            name=""
            id=""
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          {!!preview && <img className="my-3" src={preview} alt="" />}
        </div>

      <button type="submit" className="text-white w-full  bg-primary px-3 py-2 rounded-lg flex items-center justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span className="hidden md:block">{isEdit ? 'Update' : 'Create'} Book</span>
      </button>
    </form>
    </div>
  );
}
