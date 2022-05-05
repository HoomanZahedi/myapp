import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/pages/login';
import Home from '../src/pages/home';
import Register from '../src/pages/register';
import MenuBar from './components/menuBar';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header } from 'semantic-ui-react';
import {Auth} from '../src/context/auth';
import SinglePost from "./pages/singlePost";
function App() {
  return (
    <div className="container">
      <Auth>
        <Router>
          <Container>
            <MenuBar/>
            <Routes>
              <Route exact path="/" element={<Home />} />{" "}
              <Route exact path="/login" element={<Login />} />{" "}
              <Route exact path="/register" element={<Register />} />{" "}
              <Route exact path="/posts/:postId" element={<SinglePost />} />{" "}
            </Routes>{" "}
          </Container> 
        </Router>
      </Auth>
    </div>
  );
}

export default App;
