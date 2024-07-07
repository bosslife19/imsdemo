import { React, createContext, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const SettingContext = createContext();
export default SettingContext;

export const SettingProvider = ({ children }) => {
  const [getSettingData, setGetSettingData] = useState(null);
  const [getSettingError, setSettingError] = useState(null);
  const [getSettingIsLoading, setSettingIsLoading] = useState(true);

  const [editSettingResponse, seteditSettingResponse] = useState(null);
  const [editSettingData, seteditSettingData] = useState(null);
  const [editSettingError, seteditSettingError] = useState(null);
  const [editSettingIsLoading, seteditSettingIsLoading] = useState(true);
  const [editedFormData, seteditedFormData] = useState({
    language: "",
    timezone: "",
    date_format: "",
    email_notification: "",
    dark_mode: "",
  });

  const getSetting = async () => {
    setSettingIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/settings`);
      setGetSettingData(response.data.settings);
      seteditedFormData({
        language: response.data.settings.language || "",
        timezone: response.data.settings.timezone || "",
        date_format: response.data.settings.date_format || "",
        email_notification: response.data.settings.email_notification,
        dark_mode: response.data.settings.dark_mode,
      });
    } catch (error) {
      setSettingError(error);
    } finally {
      setSettingIsLoading(false);
    }
  };

  const debouncedUpdateSettings = useCallback(
    debounce(async (data) => {
      seteditSettingIsLoading(true);
      const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
      try {
        const result = await axios.patch(`${baseUrl}/api/settings`, data);
        seteditSettingResponse(result.data.success);
        seteditSettingData(result.data.settings);
      } catch (error) {
        seteditSettingError(error);
      } finally {
        seteditSettingIsLoading(false);
      }
    }, 500),
    []
  );

  let contextData = {
    getSettingData: getSettingData,
    getSettingError: getSettingError,
    getSettingIsLoading: getSettingIsLoading,
    editedFormData: editedFormData,
    editSettingIsLoading: editSettingIsLoading,
    editSettingResponse: editSettingResponse,
    editSettingError: editSettingError,
    debouncedUpdateSettings: debouncedUpdateSettings,

    getSetting: getSetting,
    seteditedFormData: seteditedFormData,
    seteditSettingResponse: seteditSettingResponse,
    seteditSettingError: seteditSettingError,
  };
  return (
    <SettingContext.Provider value={contextData}>
      {children}
    </SettingContext.Provider>
  );
};
