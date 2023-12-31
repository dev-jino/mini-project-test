import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ItemDetail from "./pages/ItemDetail";
import Order from "./pages/Order";
import OrderCheck from "./pages/OrderCheck";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import AdminJoin from "./pages/AdminJoin";
import AdminLogin from "./pages/AdminLogin";
import AdminUserManage from "./pages/AdminUserManage";
import AdminItemManage from "./pages/AdminItemManage";

import KakaoLogin from "./pages/KakaoLogin";
import Join from "./pages/Join";

import PostTest from "./pages/PostTest";
import Post from "./components/Post";

import { IsLoginProvider } from "./contexts/IsLoginContext";
import { useContext } from "react";
import { IsLoginContext } from "./contexts/IsLoginContext";

function App() {
  return (
    <IsLoginProvider>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search-result' element={<Search />} />
              <Route path='/item-detail' element={<ItemDetail />} />
              <Route path='/order' element={<Order />} />
              <Route path='/order-check' element={<OrderCheck />} />
              <Route path='/login' element={<Login />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/admin-join' element={<AdminJoin />} />
              <Route path='/admin-login' element={<AdminLogin />} />
              <Route path='/admin-user-manage' element={<AdminUserManage />} />
              <Route path='/admin-item-manage' element={<AdminItemManage />} />
              <Route path='join' element={<Join/>} />
              
              <Route path="/kakao-login" element={<KakaoLogin />} />
          
              {/* <Route path="/post-test" element={<PostTest/>} /> */}
              {/* <Route path="/post" element={<Post/>} /> */}

          </Routes>
      </BrowserRouter>
    </IsLoginProvider>
  );
}

export default App;
