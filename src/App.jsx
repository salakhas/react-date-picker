import logo from './logo.svg';
import './App.css';
import { Date } from './Components/Date';
import {useState} from 'react'
import {ThemeContext} from './context/ThemeContext'

function App() {
  const themeHook = useState("light");
  return (
    <div className="App">
      
    <ThemeContext.Provider value = {themeHook}>
        <Date/>  
    </ThemeContext.Provider>
    </div>
  );
}

export default App;
