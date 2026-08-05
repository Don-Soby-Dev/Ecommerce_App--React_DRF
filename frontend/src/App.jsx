import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/auth/authThunks";
import { fetchCart } from "./features/cart/cartThunk";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCart());
    }
  }, [dispatch, accessToken]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
