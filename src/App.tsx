import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import { Country } from "./pages/Country";
import { Details } from "./pages/Details";
import { ImageUpload } from "./pages/ImageUpload";
import { Summary } from "./pages/Summary";
import { routes } from "./config/routes";

function App() {
  return (
    <div>
      <Header>
        <img src={logo} alt="Accountable" />
      </Header>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={routes.country} element={<Country />} />
            <Route path={routes.personalDetails} element={<Details />} />
            <Route path={routes.imageUpload} element={<ImageUpload />} />
            <Route path={routes.summary} element={<Summary />} />
            <Route path="*" element={<Navigate to={routes.country} />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </div>
  );
}

export default App;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  background-color: #f6f3fe;

  img {
    max-width: 100%;
  }
`;

const Main = styled.main`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;
