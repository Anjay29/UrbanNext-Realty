import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import Header from "./components/Header.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signout" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
