import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AdminLayouts from './Layouts/adminlayouts/AdminLayouts'
import MajorPage from './pages/Admin/majorpage/majorpage'
import GroupPage from './pages/Admin/grouppage/grouppage'
import StudentPage from './pages/Admin/studentpage/studentpage'
import CreateMajor from './pages/Admin/createmajor/createmajor'
import CreateGroup from './pages/Admin/creategroup/creategroup'
import CreateStudent from './pages/Admin/createstudent/createstudent'
import SingupPage from './pages/public/singuppage/singuppage'
import LoginPage from './pages/public/loginpage/loginpage'
import TeacherLayouts from './Layouts/teacherlayouts/teacherlayouts'
import PublicLayouts from './Layouts/publiclayouts/publiclayouts'
import AdminRoute from './middleware/adminRoute'
import Homepage from './pages/public/home/homepage'
import { useDispatch, useSelector } from 'react-redux'
import { user } from './redux/action/authaction'
import { useEffect } from 'react'
import Spinner from './pages/public/spinner/spinner'
import NotFound from './pages/public/Notfound/Notfound'
import Formbiden from './pages/public/forbidden/forbidden'
import Cookies from 'js-cookie'
import axios from 'axios'
import TeacherRoute from './middleware/teacherRoute'
import TeacherDashboard from './pages/teacher/dasebord'


function App() {
  const is_loading = useSelector(state => state.user.is_loading)

  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("XSRF-TOKEN")
    if (!token) axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true })

    dispatch(user())
  }, [])

  if (is_loading) return <Spinner />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminRoute >
          <AdminLayouts />
        </AdminRoute>}>
          <Route path='majors' element={<MajorPage />} />
          <Route path="groups" element={<GroupPage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="createmajor" element={<CreateMajor />} />
          <Route path="creategroup" element={<CreateGroup />} />
          <Route path="createstudent" element={<CreateStudent />} />
        </Route>
        <Route path="/teacher" element={<TeacherRoute><TeacherLayouts /></TeacherRoute>}>
          <Route index element={<TeacherDashboard />} />
        </Route>

        <Route path="/" element={<PublicLayouts />}>

          <Route index element={<Homepage />} />
          <Route path="singup" element={<SingupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/Formbiden" element={<Formbiden />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
