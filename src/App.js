import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./components/pages/NewQuote"));
const QuoteDetails = React.lazy(() =>
  import("./components/pages/QuoteDetails")
);
const NotFound = React.lazy(() => import("./components/pages/NotFound"));
const AllQuotes = React.lazy(() => import("./components/pages/AllQuotes"));

function App() {
  return (
    <div>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/quotes" />} />
            <Route path="/quotes" element={<AllQuotes />} />
            <Route path="/quotes/:quoteId/*" element={<QuoteDetails />} />
            <Route path="/new-quote" element={<NewQuote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
