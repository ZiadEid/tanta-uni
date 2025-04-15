import { BrowserRouter, Route, Routes } from "react-router-dom"
import LayoutWraper from "../Layout/LayoutWraper";
import LoginPage from "../Pages/Auth/LoginPage";
import StudyYearsPage from "../Pages/StudyYearsPage";
import SectionsPage from "../Pages/SectionsPage";
import SubjectsPage from './../Pages/SubjectsPage';
import DoctorsPage from './../Pages/DoctorsPage';
import StudentsPage from './../Pages/StudentsPage';
import Error from "../Pages/Error";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <LayoutWraper>
                <StudyYearsPage />
              </LayoutWraper>
            }
          />
          <Route
            path="sections"
            element={
              <LayoutWraper>
                <SectionsPage />
              </LayoutWraper>
            }
          />
          <Route
            path="subjects"
            element={
              <LayoutWraper>
                <SubjectsPage />
              </LayoutWraper>
            }
          />
          <Route
            path="doctors"
            element={
              <LayoutWraper>
                <DoctorsPage />
              </LayoutWraper>
            }
          />
          <Route
            path="students"
            element={
              <LayoutWraper>
                <StudentsPage />
              </LayoutWraper>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <LayoutWraper>
                <Error />
              </LayoutWraper>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router