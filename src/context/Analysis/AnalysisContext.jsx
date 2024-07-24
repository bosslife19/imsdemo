import { React, createContext, useState } from "react";

const AnalysisContext = createContext();
export default AnalysisContext;

export const AnalysisProvider = ({ children }) => {
 

  const [schoolDataAnalysis, setSchoolDataAnalysis] = useState({ value: 0, trend: '' });
  const [itemDataAnalysis, setItemDataAnalysis] = useState({ value: 0, trend: '' });
  const [userDataAnalysis, setUserDataAnalysis] = useState({ value: 0, trend: '' });


  const ProcessAnalysis = (items, type) => {
    const getStartOfWeek = (date) => {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
      startOfWeek.setHours(0, 0, 0, 0);
      return startOfWeek;
    };
  
    const getEndOfWeek = (date) => {
      const endOfWeek = new Date(date);
      endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 7);
      endOfWeek.setHours(23, 59, 59, 999);
      return endOfWeek;
    };
  
    const countItemsInWeek = (items, start, end) => {
      return items.filter((item) => {
        const createdAt = new Date(item.created_at);
        return createdAt >= start && createdAt <= end;
      }).length;
    };
  
    const currentDate = new Date();
    const currentWeekStart = getStartOfWeek(currentDate);
    const currentWeekEnd = getEndOfWeek(currentDate);
    const previousWeekStart = getStartOfWeek(
      new Date(currentDate.setDate(currentDate.getDate() - 7))
    );
    const previousWeekEnd = getEndOfWeek(
      new Date(currentDate.setDate(currentDate.getDate() - 7))
    );
  
    const currentWeekCount = countItemsInWeek(items, currentWeekStart, currentWeekEnd);
    const previousWeekCount = countItemsInWeek(items, previousWeekStart, previousWeekEnd);
    const calculate = currentWeekCount - previousWeekCount;

    if (type === 'schools') {
      setSchoolDataAnalysis({value: calculate, trend: currentWeekCount > previousWeekCount ? 'up': currentWeekCount < previousWeekCount ? 'down': 'steady'});
    } else if (type === 'items') {
      setItemDataAnalysis({value: calculate, trend: currentWeekCount > previousWeekCount ? 'up': currentWeekCount < previousWeekCount ? 'down': 'steady'});
    } else if (type === 'users') {
      setUserDataAnalysis({value: calculate, trend: currentWeekCount > previousWeekCount ? 'up': currentWeekCount < previousWeekCount ? 'down': 'steady'})
    }
  
    // setValue(calculate);
    // if (currentWeekCount > previousWeekCount) {
    //   setTrend("up");
    // } else if (currentWeekCount < previousWeekCount) {
    //   setTrend("down");
    // } else {
    //   setTrend("steady");
    // }
  };
  
  let contextData = {
    ProcessAnalysis: ProcessAnalysis,
    userDataAnalysis: userDataAnalysis,
    itemDataAnalysis: itemDataAnalysis,
    schoolDataAnalysis: schoolDataAnalysis,
    // value: value,
    // trend: trend,
  };

  return (
    <AnalysisContext.Provider value={contextData}>
      {children}
    </AnalysisContext.Provider>
  );
};
