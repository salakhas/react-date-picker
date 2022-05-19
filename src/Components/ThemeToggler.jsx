import {useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";
import {nanoid} from "nanoid";

const themeTogglerStyle = {
    cursor: "pointer"
}
const ThemeToggler = () => {
    const[themeMode, setThemeMode] = useContext(ThemeContext);
    return(
        <div key={nanoid()} style = {themeTogglerStyle} onClick = {() => {setThemeMode(themeMode === "light"? "dark": "light")}}>
            <span key={nanoid()} style={{fontSize:"30px"}} title = "switch theme">
                {themeMode === "light" ? "🌙" : "☀️"}
            </span>
        </div>
    );
}

export default ThemeToggler;
