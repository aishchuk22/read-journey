import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import MyBook from "../components/MyBook/MyBook";
import { fetchBookDetails } from "../redux/books/booksOperations";

const ReadingPage = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookDetails(bookId));
    }
  }, [dispatch, bookId]);

  return (
    <Dashboard>
      <MyBook />
    </Dashboard>
  );
};

export default ReadingPage;
