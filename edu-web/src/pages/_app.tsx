import { AuthLayout, DefaultLayout } from "@/components";
import store from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="light"
        style={{ zIndex: 1000000 }}
      />
      <CookiesProvider>
        <AuthLayout>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </AuthLayout>
      </CookiesProvider>
    </Provider>
  );
}
