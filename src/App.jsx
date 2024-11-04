import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Services from "./Pages/Services.jsx";
import Instructions from "./Pages/Instructions.jsx";
import Subscriptions from "./Pages/Subscriptions.jsx";
import Opinion from "./Pages/Opinion.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import AuthProvider from "react-auth-kit";
import { store as authStore } from "./Stores/authStore";

const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={clientQuery}>
        <AuthProvider store={authStore}>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="services" element={<Services />} />
                <Route path="instructions" element={<Instructions />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="opinion" element={<Opinion />} />

                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
