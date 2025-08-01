import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import RecommendedPage from "../../pages/RecommendedPage";
import LibraryPage from "../../pages/LibraryPage";
import ReadingPage from "../../pages/ReadingPage";

import Loader from "../Loader/Loader";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import MainLayout from "../Layout/MainLayout";

import { refreshUser } from "../../redux/auth/authOperations";
import { selectIsRefreshing } from "../../redux/auth/authSelectors";

const AppContent = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login" component={<MainLayout />} />
          }
        >
          <Route index element={<Navigate to="/recommended" replace />} />
          <Route path="recommended" element={<RecommendedPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="reading/:bookId" element={<ReadingPage />} />
        </Route>
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AppContent;
