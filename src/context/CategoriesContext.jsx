import { createContext, useState } from "react";
export const CategoriesContext = createContext();
export const CategoriesProvider = ({ children }) => {
  const [categoryValue, setCategoryValue] = useState("ALL");
    const [categories, setCategories] = useState([]);
  return (
    <CategoriesContext.Provider value={{categoryValue, setCategoryValue, categories, setCategories}}>
      {children}
    </CategoriesContext.Provider>
  );
};
