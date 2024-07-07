import { React, createContext, useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "../General/GeneralContext";

const ProfileContext = createContext();
export default ProfileContext;

export const ProfileProvider = ({ children }) => {
    const [getSingleUserData, setGetSingleUserData] = useState(null);
    const [getSingleUserError, setSingleUserError] = useState(null);
    const [getSingleUserIsLoading, setSingleUserIsLoading] = useState(true);
  
    const [editUserResponse, seteditUserResponse] = useState(null);
    const [editUserData, seteditUserData] = useState(null);
    const [editUserError, seteditUserError] = useState(null);
    const [editUserIsLoading, seteditUserIsLoading] = useState(true);
    const [editedFormData, seteditedFormData] = useState({
      name: "",
      phone_number: "",
      image: "",
    });

    const { handleAddFile, addFileError } =
    useContext(GeneralContext);

    const getSingleUser = async () => {
        setSingleUserIsLoading(true);
        const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
        try {
          const response = await axios.get(`${baseUrl}/api/profile`);
          setGetSingleUserData(response.data.user);
          seteditedFormData({
            name: response.data.user.name || "",
            phone_number: response.data.user.phone_number || "",
            image: response.data.user.image || "",
          });
        } catch (error) {
          setSingleUserError(error);
        } finally {
          setSingleUserIsLoading(false);
        }
      };

      const handleEditUser = async (e) => {
        e.preventDefault();
        seteditUserIsLoading(true);
        const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
        let fileResponse;
    
        if (e.target.image.files[0]) {
          const imageData = e.target.image.files[0];
          fileResponse = await handleAddFile(imageData);
        }
    
        const updatedData = {
          name: editedFormData.name,
          phone_number: editedFormData.phone_number,
          image:
            fileResponse && fileResponse.success
              ? fileResponse.url
              : editedFormData.image,
        };
        try {
          const result = await axios.patch(`${baseUrl}/api/profile`, updatedData);
          seteditUserResponse(result.data.success);
          seteditUserData(result.data.user);
        } catch (error) {
          seteditUserError(error.response.data.message);
        } finally {
          seteditUserIsLoading(false);
        }
    
        if (!fileResponse && !fileResponse.success) {
          seteditUserError(addFileError || "File upload failed");
          seteditUserIsLoading(false);
        }
      };

      let contextData = {
        getSingleUserIsLoading: getSingleUserIsLoading,
        getSingleUserError: getSingleUserError,
        getSingleUserData: getSingleUserData,
        editedFormData: editedFormData,
        editUserIsLoading: editUserIsLoading,
        editUserError: editUserError,
        editUserResponse: editUserResponse,
        editUserData: editUserData,
    
        getSingleUser: getSingleUser,
        handleEditUser: handleEditUser,
        seteditUserError: seteditUserError,
        seteditUserResponse: seteditUserResponse,
        seteditedFormData: seteditedFormData,
      };
    
    return (
        <ProfileContext.Provider value={contextData}>
          {children}
        </ProfileContext.Provider>
      );
}