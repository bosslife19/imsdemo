import { React, createContext, useState } from "react";
import axios from "axios";

const GeneralContext = createContext();
export default GeneralContext;

export const GeneralProvider = ({ children }) => {
  const [addFileError, setAddFileError] = useState(null);
  const [FileResponse, setFileResponse] = useState(null);
  const [addFileIsLoading, setAddFileIsLoading] = useState(true);

  const handleAddFile = async (FileData) => {
    setAddFileIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const formDataForImage = new FormData();
    formDataForImage.append("file", FileData);

    try {
      const result = await axios.post(
        `${baseUrl}/api/upload`,
        formDataForImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileResponse(result.data);
      return result.data;
    } catch (error) {
      console.log(error)
      setAddFileError(error.response.data.message);
      return null;
    } finally {
      setAddFileIsLoading(false);
    }
  };

  let contextData = {
    addFileError: addFileError,
    FileResponse: FileResponse,
    addFileIsLoading: addFileIsLoading,

    handleAddFile: handleAddFile,
  };

  return (
    <GeneralContext.Provider value={contextData}>
      {children}
    </GeneralContext.Provider>
  );
};