import React, { useState } from "react";
import "./App.css";
import { BsImage } from "react-icons/bs";

import img1 from "./images/image-1.webp";
import img2 from "./images/image-2.webp";
import img3 from "./images/image-3.webp";
import img4 from "./images/image-4.webp";
import img5 from "./images/image-5.webp";
import img6 from "./images/image-6.webp";
import img7 from "./images/image-7.webp";
import img8 from "./images/image-8.webp";
import img9 from "./images/image-9.webp";
import img10 from "./images/image-10.jpeg";
import img11 from "./images/image-11.jpeg";

const App = () => {
  const [items, setItems] = useState([
    img11,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
  ]);

  const [isDragging, setIsDragging] = useState(true);
  const [newItems, setNewItems] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [select, setSelect] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  var selectedElements = [];

  const handleDragStart = (e, index) => {
    console.log(items[index]);
    setDraggedItem(items[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
    setIsDragging(true);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItem = items[index];

    if (draggedItem !== draggedOverItem) {
      const newItems = [...items];
      newItems.splice(items.indexOf(draggedItem), 1);
      newItems.splice(index, 0, draggedItem);
      setItems(newItems);
      setDraggedOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
    setIsDragging(false);
  };

  // check box function
  function handleCheckBox(value, event) {
    if (event.target.checked) {
      setCount(count + 1);

      setSelect([...select, value]);
    } else {
      const newSelete = select.filter((img) => img !== value);
      setSelect(newSelete);
      setCount(count - 1);
      console.log("Delete", value);
    }
  }

  console.log(select);

  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImageSelection = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const deleteSelectedImages = () => {
    const remainingImages = items.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setSelectedImages([]);

    console.log("Deleted images:", selectedImages);
    console.log("Remaining images:", remainingImages);
    setItems(remainingImages);
    setCount(0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const URL =
      "https://api.imgbb.com/1/upload?&key=4d5a64efec46b0e4ba427206e6bcef01";
    const data = fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const newImg = data.data.url;
        setItems([...items, newImg]);
      })
      .catch((e) => console.error(e));
    setSelectedFile(file);
  };

  // console.log(selectedFile);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10">
      <div className="flex border-b border-b-gray-300 py-3 mb-3 items-center justify-between">
        {count > 0 ? (
          <h2 className=" text-xl font-bold">
            <input checked type="checkbox" className="w-4 h-4 "></input> {count}{" "}
            File Selected
          </h2>
        ) : (
          <h2 className=" text-xl font-bold">Gallery</h2>
        )}

        {count > 0 && (
          <button
            onClick={deleteSelectedImages}
            className="font-bold text-lg  text-red-600"
          >
            Delete File
          </button>
        )}
      </div>
      <ul className="py-4 grid grid-cols-2 md:grid-cols-5 gap-y-3 md:gap-y-5 gap-x-3 md:gap-x-7">
        {items.map((item, index) => (
          <li
            key={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`main ${
              isDragging ? "border" : "bg-white"
            } transition-opacity border shadow ease-in-out hover:bg-black border-gray-300 duration-500 rounded-xl item relative  mb-2 ${
              index === 0
                ? "col-span-2 row-span-2 h-full"
                : "col-span-1 row-span-1  h-[165px] md:h-[218px]"
            } relative group ${
              draggedItem === item ? "shadow-md opacity-0 duration-300" : ""
            } transition-opacity relative`}
          >
            <img
              src={item}
              draggable
              className={`rounded-xl bg-white hover:opacity-50 duration-300  w-full h-full   ${
                selectedImages.includes(index) ? "opacity-50" : "opacity-100"
              }`}
              alt=""
            ></img>

            <input
              onClick={() => handleCheckBox(item, event)}
              onChange={() => toggleImageSelection(index)}
              checked={selectedImages.includes(index)}
              type="checkbox"
              className="inp absolute top-3 md:top-6 left-3 md:left-6 md:w-6 w-4 h-4 md:h-6"
            ></input>
          </li>
        ))}

        {/* new Image input */}
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="text-center h-[165px] md:h-[218px] border-2 pt-10 md:pt-16 border-gray-300 border-dashed rounded-xl p-6">
            <BsImage className="mx-auto text-2xl mb-3"></BsImage>
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
            />
            Add Images
          </div>
        </label>
      </ul>
    </div>
  );
};

export default App;
