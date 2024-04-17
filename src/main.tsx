import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import rootReducer from "./modules/index.ts";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
