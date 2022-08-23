import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Pages/Shared/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Appointment from './Pages/Appointment/Appointment';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import RequireAdmin from './Pages/Login/RequireAdmin';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';
import Payment from './Pages/Dashboard/Payment';
import Reset from './Pages/Login/Reset';
import Contacts from './Pages/Contact/Contacts';
import Review from './Pages/Review/Review';
import ManageReviews from './Pages/Dashboard/ManageReviews';
import AdminAppointments from './Pages/Dashboard/AdminAppointments';
import Information from './Pages/About/Information';
import Update from './Pages/About/Update';
import RequireDoctor from './Pages/Login/RequireDoctor';
import MyPayment from './Pages/Dashboard/MyPayment';
import DoctorAppointments from './Pages/Dashboard/DoctorAppointments';
import PaymentModal from './Pages/Dashboard/PaymentModal';
import UpdateBooking from './Pages/Dashboard/UpdateBooking';
import Doctor from './Pages/Doctor/Doctor';
import DoctorReview from './Pages/Dashboard/DoctorReview';
import AddSchedule from './Pages/Dashboard/AddSchedule';
import UpdateComment from './Pages/Dashboard/UpdateComment';
import DoctorAddSchedule from './Pages/Dashboard/DoctorAddSchedule';

function App() {
  return (
    <div className='max-w-7xl mx-auto px-12'>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={
          <RequireAuth>
            <About />
          </RequireAuth>
        } />
        <Route path="contact" element={<Contacts />} />
        <Route path="doctor" element={<Doctor/>} />
        <Route path="appointment" element={
          <RequireAuth>
            <Appointment />
          </RequireAuth>
        } />
        <Route path="review" element={
          <RequireAuth>
            <Review />
          </RequireAuth>
        } />
        <Route path="add" element={
          <RequireAuth>
            <Information></Information>
          </RequireAuth>
        } />
        <Route path="about/update/:id" element={
          <RequireAuth>
            <Update></Update>
          </RequireAuth>
        } />
        <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} >
          <Route path="appointment" element={<MyAppointments></MyAppointments>}></Route>
          <Route path="review" element={<MyReview></MyReview>}></Route>
          <Route path="payment" element={<MyPayment></MyPayment>}></Route>
          <Route path="history" element={<MyHistory></MyHistory>}></Route>
          <Route path="payment/:id" element={<Payment></Payment>}></Route>
          <Route path="adminAppointment" element={<RequireAdmin><AdminAppointments></AdminAppointments></RequireAdmin>}></Route>
          <Route path="pay" element={<RequireAdmin><PaymentModal></PaymentModal> </RequireAdmin>}></Route>
          <Route path="updateBooking/:id" element={<RequireAdmin><UpdateBooking></UpdateBooking> </RequireAdmin>}></Route>
          <Route path="addSchedule" element={<RequireAdmin><AddSchedule/> </RequireAdmin>}></Route>

          <Route path="users" element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
          <Route path="addDoctor" element={<RequireAdmin><AddDoctor></AddDoctor></RequireAdmin>}></Route>
          <Route path="manageDoctor" element={<RequireAdmin><ManageDoctors></ManageDoctors></RequireAdmin>}></Route>
          <Route path="manageReview" element={<RequireAdmin><ManageReviews></ManageReviews> </RequireAdmin>}></Route>
          <Route path="doctorReview" element={<RequireDoctor><DoctorReview></DoctorReview> </RequireDoctor>}></Route>
          <Route path="doctorAppointment" element={<RequireDoctor><DoctorAppointments></DoctorAppointments> </RequireDoctor>}></Route>
          <Route path="updateComment/:id" element={<RequireDoctor><UpdateComment></UpdateComment> </RequireDoctor>}></Route>
          <Route path="doctorAddSchedule" element={<RequireDoctor><DoctorAddSchedule></DoctorAddSchedule> </RequireDoctor>}></Route>

        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="reset" element={<Reset/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
