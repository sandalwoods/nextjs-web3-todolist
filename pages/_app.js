import "../styles/globals.css";
import { ToDoListProvider } from "../context/ToDoListApp";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

const MyApp = ({ Component, pageProps }) => (
  <ToDoListProvider>
    <div>
      <Component {...pageProps} />;
    </div>
  </ToDoListProvider>
);

export default MyApp;
