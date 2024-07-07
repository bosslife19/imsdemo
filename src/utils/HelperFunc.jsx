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

export  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
