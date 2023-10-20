import server from "@/Config/config";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Image  from "@editorjs/image"
import EditorJS from "@editorjs/editorjs";
const inter = Inter({ subsets: ["latin"] });
import axios from "axios";

const EditorNoSSR = ({setEditerData}) => {
  const [container, setContainer] = useState();
  const [editor, setEditor] = useState();


  const Tools = {
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
  }


  useEffect(() => {
    if (container) {
      const newEditor = new EditorJS({
        /**
         * Id of Element that should contain the Editor
         */
        // data: initialData,
        holder: container,
        tools: Tools,
        placeholder: "Let`s write something new!",

        onChange: (api, event) => {
          newEditor.save().then((res) => {
            console.log("data", res);
            setEditerData(res)
          });
          console.log("Now I know that Editor's content changed!", event);
          console.log({ api });
        },
      });

      setEditor(newEditor);

      return () => {
        if (container) {
          container.innerHTML = "";
          newEditor.isReady.then(() => {
            newEditor.destroy();
          });
        }
      };
    }
  }, [container]);
  return (
    <>
      <div className={`${inter.className}`}>
        <div ref={setContainer}></div>
      </div>
    </>
  );
};
export default EditorNoSSR;
