
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import React from 'react';
const { createReactEditorJS } = dynamic(() => import('react-editor-js'), { ssr: false });









function Editor() {

const [blocks, setBlocks] = useState([])

useEffect(() => {
 
    const ReactEditorJS = createReactEditorJS()
  
}, [])






const editorCore = React.useRef(null)

const handleInitialize = React.useCallback((instance) => {
  editorCore.current = instance
}, [])

const handleSave = React.useCallback(async () => {
  const savedData = await editorCore.current.save();
}, [])













  return (
    <ReactEditorJS onInitialize={handleInitialize} defaultValue={blocks} tools={{
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
      }} />
  )
}

export default Editor