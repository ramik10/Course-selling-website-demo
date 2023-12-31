import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Purchase from './components/CoursesId';
import Home from './components/Home';
import Courses from './components/Courses';
import PurchasedCourses from './components/PurchasedCourses';
import Navbar from './components/Navbar';
import { Box } from '@mui/system';
import Content from './components/Content';
import ContentElement from './components/contentElement';


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
      <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<Purchase />} />
        <Route path="/courses/purchased" element={<PurchasedCourses />} />
        <Route path="/courses/purchased/:courseId/content" element={<Content />} />
        <Route path="/courses/purchased/:courseId/content/:contentId" element={<ContentElement />} />
      </Routes>
      </Box>
      </Box>
    </Router>
  )

}

export default App
