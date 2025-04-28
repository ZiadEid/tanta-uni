import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LayoutWraper from "../Layout/LayoutWraper";
import LoginPage from "../Pages/Auth/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import StudyYearsPage from "../Pages/StudyYearsPage";
import SectionsPage from "../Pages/SectionsPage";
import SubjectsPage from './../Pages/SubjectsPage';
import DoctorsPage from './../Pages/DoctorsPage';
import StudentsPage from './../Pages/StudentsPage';
import Error from "../Pages/Error";
import MSectionsPage from "../Pages/MSectionsPage";
import SingleSubject from "../Pages/SingleSubject";
import MarkesPage from "../Pages/MarkesPage";
import { useStore } from "../Store";
import DoctorSubjects from "../Pages/DoctorSubjects";
import Loader from "../Layout/Loader";

const Router = () => {
  const { user, token } = useStore();

  if (token && !user) {
    return (
      <Loader />
    )
  }



  return (
    <BrowserRouter>
      <Routes>
        {
          token && user
          &&
          <Route path="/">
            <Route
              index
              element={
                user.role === "employee"
                  ?
                  <MSectionsPage />
                  :
                  <LayoutWraper>
                    <ProfilePage />
                  </LayoutWraper>
              }
            />
            {
              user.role === "employee"
                ?
                <Route path=":mSection">
                  <Route
                    index
                    element={
                      <LayoutWraper>
                        <ProfilePage />
                      </LayoutWraper>
                    }
                  />
                  <Route
                    path="study-years"
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
                  <Route path="subjects">
                    <Route
                      index
                      element={
                        <LayoutWraper>
                          <SubjectsPage />
                        </LayoutWraper>
                      }
                    />
                    <Route
                      path=":subjectsId"
                    >
                      <Route
                        index
                        element={
                          <LayoutWraper>
                            <SingleSubject />
                          </LayoutWraper>
                        }
                      />
                      <Route
                        path="markes"
                        element={
                          <LayoutWraper>
                            <MarkesPage />
                          </LayoutWraper>
                        }
                      />
                    </Route>
                  </Route>
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
                </Route>
                :
                <Route
                  path="/doctorSubject"
                >
                  <Route
                    index
                    element={
                      <LayoutWraper>
                        <DoctorSubjects />
                      </LayoutWraper>
                    }
                  />
                  <Route
                    path=":subjectsId"
                    element={
                      <LayoutWraper>
                        <MarkesPage />
                      </LayoutWraper>
                    }
                  />
                </Route>
            }
          </Route>
        }
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/error"
          element={
            <LayoutWraper>
              <Error />
            </LayoutWraper>
          }
        />
        <Route
          path="*"
          element={
            <LayoutWraper>
              <Error />
            </LayoutWraper>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router