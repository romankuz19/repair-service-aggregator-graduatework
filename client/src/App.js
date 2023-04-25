import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import {ServicesPage} from './pages/ServicesPage'
import {TasksPage} from './pages/TasksPage'
import { MyServicesPage } from './pages/MyServicesPage'
<<<<<<< HEAD
=======
import { MyTasksPage } from './pages/MyTasksPage.jsx'
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
import { ServicePage } from './pages/ServicePage'
import { TaskPage } from './pages/TaskPage.jsx'
import { AddServicePage } from './pages/AddServicePage'
import { MyProfilePage } from './pages/MyProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { EditServicePage } from './pages/EditServicePage.jsx'
import { EditTaskPage } from './pages/EditTaskPage.jsx'
import {AddTaskPage} from './pages/AddTaskPage'
import {ChatsPage} from './pages/ChatsPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/auth/authSlice.js'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
    

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<ServicesPage />} />
                <Route path='tasks' element={<TasksPage />} />
<<<<<<< HEAD
                <Route path='myservices' element={<MyServicesPage />} />
=======
                <Route path='my-services' element={<MyServicesPage />} />
                <Route path='my-tasks' element={<MyTasksPage />} />
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                <Route path='service/:id' element={<ServicePage />} />
                <Route path='service/:id/edit' element={<EditServicePage />} />
                <Route path='task/:id' element={<TaskPage />} />
                <Route path='task/:id/edit' element={<EditTaskPage />} />
<<<<<<< HEAD
                <Route path='createservice' element={<AddServicePage />} />
                <Route path='createtask' element={<AddTaskPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='myprofile' element={<MyProfilePage />} />
=======
                <Route path='create-service' element={<AddServicePage />} />
                <Route path='create-task' element={<AddTaskPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='profile' element={<MyProfilePage />} />
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                <Route path='chats' element={<ChatsPage />} />
            </Routes>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                
        </Layout>
    )
}

export default App
