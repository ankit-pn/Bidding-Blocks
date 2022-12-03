import { Box } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Navbar/Footer';
import NavBar from './components/Navbar/NavBar';
import Error from './components/routed/Error';
import Home from './components/routed/Home';
import Transactions from './components/routed/Transactions';
import Auctions from './components/routed/Auctions';
import CreateAuction from './components/routed/CreateAuction';
import Auction from './components/routed/Auction';
import Login from './admin/Login';
 

function App() {
  return <>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}  />
            <Route path='/txn' element={<Transactions/>}  />
            <Route exact path='/auctions' element={<Auctions/>}  />
            <Route path='/auctions/:aid' element={<Auction/>}  />
            <Route path='/createAuc' element={<CreateAuction/>}  />
            <Route path='/admin' element={<Login/>}  />
            <Route path='*' element={<Error/>}  />
          </Routes>
        <Box  m={0} sx={{ width : '100%' , display : 'block' , minHeight : '9vh'}} >
          <Footer/>
        </Box>
      </>
  ;
}

export default App;
