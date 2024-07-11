import { React, createContext, useState } from "react";
import axios from "axios";

const TrackingContext = createContext();
export default TrackingContext;

export const TrackingProvider = ({ children }) => {
    const [getTrackingsData, setGetTrackingsData] = useState([]);
    const [getTrackingsError, setGetTrackingsError] = useState(null);
    const [getTrackingsIsLoading, setGetTrackingsIsLoading] = useState(true);

    const [addTrackingError, setAddTrackingError] = useState(null);
    const [addTrackingIsLoading, setAddTrackingIsLoading] = useState(true);
    const [addTrackingResponse, setAddTrackingResponse] = useState(null);

    const getTrackings = async () => {
        setGetTrackingsIsLoading(true);
        const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
        try {
          const response = await axios.get(`${baseUrl}/api/tracking`);
          setGetTrackingsData(response.data.items);
        } catch (error) {
          setGetTrackingsError(error);
        } finally {
          setGetTrackingsIsLoading(false);
        }
      };

      const handleAddTracking = async (e) => {
        e.preventDefault();
        setAddTrackingIsLoading(true);
        const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
      
        const formData = {
            item_name: e.target.item_name.value,
            item_description: e.target.item_description.value,
            brand: e.target.brand.value,
            category: e.target.category.value,
            priority: e.target.priority.value,
            address: e.target.address.value,
            picking_area: e.target.picking_area.value,
            building_number: e.target.building_number.value,
            action: e.target.action.value,
            reference_number: e.target.reference_number.value,
            additional_info: e.target.additional_info.value,
            time_moved: e.target.time_moved.value,
            date_moved: e.target.date_moved.value,
        };
        try {
          const result = await axios.post(`${baseUrl}/api/tracking`, formData);
          setAddTrackingResponse(result.data);
          console.log(result);
        } catch (error) {
            setAddTrackingError(error.response.data.message);
          console.log(error);
        } finally {
            setAddTrackingIsLoading(false);
        }
      };


  let contextData = {
    getTrackings: getTrackings,
    setAddTrackingError: setAddTrackingError,
    setAddTrackingResponse: setAddTrackingResponse,
    handleAddTracking: handleAddTracking,

    getTrackingsIsLoading: getTrackingsIsLoading,
    getTrackingsData: getTrackingsData,
    getTrackingsError: getTrackingsError,
    addTrackingError: addTrackingError,
    addTrackingResponse: addTrackingResponse,
    addTrackingIsLoading: addTrackingIsLoading,
  };

  return (
    <TrackingContext.Provider value={contextData}>
      {children}
    </TrackingContext.Provider>
  );
};
