import { useParams, Route, Routes, Link, useLocation } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "./../quotes/HighlightedQuote";
import useHttp from "./../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">Something went wrong</div>;
  }

  if (status === "completed" && !quote.text) {
    return <p>No quote found</p>;
  }

  return (
    <section>
      <HighlightedQuote {...quote} />
      <Routes>
        <Route
          path=""
          element={
            <div className="centered">
              <Link className="btn--flat" to={`${pathname}/comments`}>
                Load Comments
              </Link>
            </div>
          }
        />
        <Route path={`/comments`} element={<Comments />} />
      </Routes>
    </section>
  );
};

export default QuoteDetails;
