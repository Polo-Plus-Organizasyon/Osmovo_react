import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Index from './osmovo_folder/Index'
import Checkout from './osmovo_folder/Checkout'
import Register from './osmovo_folder/Register'
import Dashboard from './osmovo_folder/Dashboard'
import Login from './osmovo_folder/login'
import ProtectedRoute from './ProtectedRoute'
import Kvkk from './components/KVKK'
import Terms from  './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'
import TeslimatIade from './components/TeslimatSartlari'
import Faqsection from './components/Faq'
import AboutSection from './components/AboutUs'
import Com from  './components/Com'
import Ticket from './components/Ticket'
import Tickets from './components/Tickets'
import Paysuccess from './components/Paysuccess'
import PayWrong from './components/PayWrong'
import Upgrade from './components/Upgrade'

function App() {

  const token=localStorage.getItem("authToken")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path='/kvkk' element={<Kvkk/>} />
        <Route path='/kullanim' element={<Terms/>} />
        <Route path='/gizlilik' element={<PrivacyPolicy/>} />
        <Route path='/teslimat-iade' element={<TeslimatIade/>} />
        <Route path='/faq' element={<Faqsection/>} />
        <Route path='/about' element={<AboutSection/>} />
        <Route path='/iletisim' element={<Com/>} />
        <Route path='/ticket/:id' element={<ProtectedRoute><Ticket/></ProtectedRoute>} />
        <Route path='dashboard/tickets' element={<ProtectedRoute><Tickets/></ProtectedRoute>} />
        <Route path='/paysuccess' element={<ProtectedRoute><Paysuccess/></ProtectedRoute>} />
        <Route path='/paywrong' element={<ProtectedRoute><PayWrong/></ProtectedRoute>} />
        <Route path='/dashboard/upgrade' element={<ProtectedRoute><Upgrade/></ProtectedRoute>} />







        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
