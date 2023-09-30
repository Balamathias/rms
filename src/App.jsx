import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GlobalStyles from "./styles/GlobalStyles"
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Account from './pages/Account'
import Users from './pages/Users'
import Settings from './pages/Settings'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout from './ui/AppLayout'
import Booking from './ui/Booking'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    }
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='bookings/:bookingId' element={<Booking />} />
            <Route path='cabins' element={<Cabins />} />
            <Route path='account' element={<Account />} />
            <Route path='users' element={<Users />} />
            <Route path='settings' element={<Settings />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position='top-right'
        gutter={12}
        containerStyle={{margin: '12px'}}

        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
            padding: '11px 20px',
            fontSize: '14px',
            maxWidth: '500px',
          }
        }}
      />
    </QueryClientProvider>
  )
}

export default App