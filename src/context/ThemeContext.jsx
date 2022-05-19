import { useContext,createContext } from "react";


export const ThemeContext = createContext(["light", () => {}]);

// default ThemeContext;