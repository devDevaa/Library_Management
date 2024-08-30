import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {

    let contexts = useContext(ThemeContext);
    if(contexts == undefined) {
        new Error('this can be use only in theme context provider')
    }
    return contexts; // {theme: dark, chageTheme}
}