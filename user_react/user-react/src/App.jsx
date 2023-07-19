import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Purchase from './components/CoursesId';
import Home from './components/Home';
import Courses from './components/Courses';
import PurchasedCourses from './components/PurchasedCourses';
import Navbar from './components/Navbar';


// const Background = styled("div")({
//   height: "100vh",
//   backgroundColor: "#242424",
//   //backgroundImage: `url("/WhatsApp Image 2023-07-11 at 6.37.02 PM.jpeg")`,
//   //backgroundPosition: "center",
//   backgroundSize: "contain",
// });

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<Purchase />} />
        <Route path="/courses/purchased" element={<PurchasedCourses />} />
      </Routes>
    </Router>
  )

}

export default App