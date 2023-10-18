import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import _ from "lodash/debounce";
import axios from "axios";
import { useRouter } from "next/router";
import Shimmer from "./Shimmer";
import server from "@/Config/config";

const CustomEditor = (props) => {
  const [editorInstance, setEditorInstance] = useState(null);
  const { setContent, content } = props;
  const [heading, setheading] = useState("");
  const [topic, settopic] = useState("");
  const [file, setfile] = useState("");
  const [time, settime] = useState(5);
  const [loading, setloading] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (clicked) {
      validateForm();
      console.log("mounted");
    }
  }, [topic, heading, file,clicked]);

  const validateForm = () => {
    let errors = {};

    if (!topic) {
      errors.topic = "Topic is required.";
    }

    if (!file) {
      errors.file = "Please Add Photo.";
    }

    if (!heading) {
      errors.heading = "Heading is required.";
    } else if (heading.length < 10) {
      errors.heading = "Heading must be at least 10 characters.";
    }
    console.log('validation');
    setErrors(errors);
    console.log(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    console.log(isFormValid);
      handleSave()
   
  };

  const handleSave = async () => {

   
    // validateForm()
    console.log(isFormValid);
    setclicked(true);
    
    if (isFormValid) {
      setloading(true)
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // For smooth scrolling
    }); 

      if (editorInstance) {
        const data = await editorInstance.save();
        const user = JSON.parse(localStorage.getItem("user"));

        const formData = new FormData();

        formData.append("file", file);
         

       

        

       
         console.log('reached image upload');
        const imgresponse = await axios.post(
          `${server}/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: false,
          }
        );

        const blogData = {
          creator: user?.name,
          heading: heading,
          readTime: time,
          content: data,
          image: imgresponse?.data?.file?.url,
          creatorimg: user?.image,
          topic: topic,
        };

        // setloading(true)
        console.log('reached blog upload');
        const blogresponse = await axios.post(
          `${server}/blog`,
          blogData
        );

        // editorInstance.render(DEFAULT_INITIAL_DATA);

        console.log(blogresponse.data);
        router.push("/");
      } else {
        console.error("Editor instance is not available");
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // For smooth scrolling
    });
    }
    // setloading(false);
  };

  const isInstance = useRef();

  useEffect(() => {
    if (isInstance.current === null) {
      initEditor();
    }

    return () => {
      isInstance?.current?.destroy();
      isInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        isInstance.current = editor;
      },
      autofocus: true,
      // data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
      },
      tools: {
        header: Header,
        paragraph: Paragraph,
        image: {
          class: Image,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append("file", file);
                const response = await axios.post(
                  `${server}/upload-image`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: false,
                  }
                );
                console.log(response?.data);
                if (response?.data?.success === 1) {
                  return response?.data;
                }
              },
            },
          },
        },
      },
    });
    setEditorInstance(editor);
  };

  return (
    <>
      {loading && <Shimmer />}
      <div className="w-1/2 mx-auto mt-20">
        <div className="flex justify-center mb-4">
          <h3 className="font-bold text-xl">Add Blog Datas Here</h3>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Main Heading
          </label>
          <input
            type="text"
            name="mainHeader"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Main Header"
            value={heading}
            onChange={(e) => {
              setheading(e.target.value);
            }}
            required
          />
          {errors.heading && <p className="error">{errors.heading}</p>}
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Topic
          </label>
          <input
            type="text"
            name="mainHeader"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Topic"
            value={topic}
            onChange={(e) => {
              settopic(e.target.value);
            }}
            required
          />
          {errors.topic && <p className="error">{errors.topic}</p>}
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Main Image
          </label>
          <input
            type="file"
            name="mainImage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Choose Image"
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
            required
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Reading Time
          </label>
          <input
            type="number"
            name="mainImage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Reading time"
            value={time}
            onChange={(e) => {
              settime(e.target.value);
            }}
            required
          />
          {errors.time && <p className="error">{errors.time}</p>}
        </div>
      </div>

      <div className="-z-50" id="editorjs"></div>
      <div className="flex justify-center">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mx-auto"
          onClick={()=>{validateForm()}}
        >
          Save Blog Post
        </button>
      </div>
    </>
  );
};

export default CustomEditor;
