import ThemeToggler from "./ThemeToggler";
import {nanoid} from "nanoid";

const headerStyles = {
    padding: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:"#724AEB",
    color:"white"
}
const Header = () => {
    return(
        <header  key={nanoid()} style = {headerStyles}>
            <h1  key={nanoid()}>&nbsp;&nbsp;Date Picker</h1>
            <ThemeToggler/>
        </header>
    );
}

export default Header;
