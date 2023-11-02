import React, { useState } from "react";
import "./App.css";

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
    img11,
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    console.log(items[index]);
    setDraggedItem(items[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    // console.log(index, items[index])
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
  };

  const [count, setCount] = useState(0);

  var selectedElements = [];

  const [select, setSelect] = useState([]);

  function handleValue(value, event) {
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
    const remainingImages = items.filter((_, index) => !selectedImages.includes(index));
    setSelectedImages([]); // Clear the selection
    // You can now update your state or API with the remainingImages.
    console.log('Deleted images:', selectedImages);
    console.log('Remaining images:', remainingImages);
    setItems(remainingImages)
    setCount(0)
  };

  return (

    <div className="px-10">
      <div className="flex justify-between">
      <h2 className=" text-xl font-bold mt-4">
         {count} File Selected 
      </h2>

      <button onClick={deleteSelectedImages} className="font-bold text-lg text-red-600">Delete File</button>
      </div>
      <ul className="py-4 grid  grid-cols-5 gap-5">
        {items.map((item, index) => (
          <li
            key={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            // onClick={()=> deleteElement(item)}

            className={`border ease-in-out border-gray-300 duration-300 rounded-xl item relative  mb-2 ${
              index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            } relative group ${
              draggedItem === item ? "shadow-md opacity-0" : ""
            } transition-opacity relative`}
          >

     
            <img
              src={item}
              className={`rounded-xl   w-full h-full  ${
                selectedImages.includes(index) ? "opacity-50" : "opacity-100"
              }`}
              alt=""
            ></img>


<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300"></div>


            <input
              onClick={() => handleValue(item, event)}
              onChange={() => toggleImageSelection(index)}
              checked={selectedImages.includes(index)}
              type="checkbox"
              className="absolute top-6 checkbox left-6 w-6 h-6"
            ></input>
          </li>
        ))}
        {draggedOverIndex !== null && (
          <li
            className="bg-transparent p-2 mb-2 h-8"
            style={{ visibility: "hidden" }}
          >
            &nbsp; {/* Placeholder item */}
          </li>
        )}
      </ul>
    </div>

    // <div>
    //   <h2 className="text-center text-2xl font-bold mt-4">
    //     Drag and Drop Reorder
    //   </h2>
    //   <ul className="py-4 grid  grid-cols-5 gap-5">
    //     {items.map((item, index) => (
    //       <li
    //         key={index}
    //         draggable
    //         onDragStart={(e) => handleDragStart(e, index)}
    //         onDragOver={(e) => handleDragOver(e, index)}
    //         onDragEnd={handleDragEnd}
    //         className={`border ease-in-out border-black duration-300 p-2 mb-2 ${
    //           index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
    //         } relative group ${
    //           draggedItem === item ? "shadow-md opacity-0" : ""
    //         } transition-opacity`}
    //       >
    //         <img src={item} alt=""></img>
    //       </li>
    //     ))}
    //     {draggedOverIndex !== null && (
    //       <li
    //         className="bg-transparent p-2 mb-2 h-8"
    //         style={{ visibility: "hidden" }}
    //       >
    //         &nbsp; {/* Placeholder item */}
    //       </li>
    //     )}
    //   </ul>
    // </div>

    // <div className='relative'>
    //   <h2>Drag and Drop Reorder</h2>
    //   <ul className='grid  grid-cols-5 gap-5'>
    //     {items.map((item, index) => (
    //       <li
    //       className={`bg-blue-100 p-2 mb-2 ${
    //         draggedItem === item ? 'opacity-0' : ''
    //       } transition-opacity`}
    //         key={index}
    //         draggable
    //         onDragStart={(e) => handleDragStart(e, index)}
    //         onDragOver={(e) => handleDragOver(e, index)}
    //         onDragEnd={handleDragEnd}
    //       >
    //         <img src={item} alt=''></img>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default App;
