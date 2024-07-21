import React from 'react';

function HelperFunc() {
  return (
    <div>HelperFunc</div>
  )
}

export default HelperFunc

export const convertDate= (givenDateString) => {
    const givenDate = new Date(givenDateString);
    const currentDateString = givenDate.toLocaleString("en-GB");
    return currentDateString;
};

export const convertDated = (givenDateString) => {
  const givenDate = new Date(givenDateString);
  
  // Get parts of the date
  const year = givenDate.getFullYear();
  const month = givenDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = givenDate.getDate();
  
  // Format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  return formattedDate;
};


export const convertTime = (givenDateString) => {
  const givenDate = new Date(givenDateString);
  
  // Get parts of the time
  const hours = givenDate.getHours();
  const minutes = givenDate.getMinutes();
  const seconds = givenDate.getSeconds();
  
  // Format the time as HH:mm:ss
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return formattedTime;
};

// export const currentTime = convertDate(givenDateStrings);

export  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
