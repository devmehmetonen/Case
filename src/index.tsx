import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserHistory } from "history";
import Router from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store/index";
import reportWebVitals from './reportWebVitals';
import "./components/localization/config";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const history = createBrowserHistory();


root.render(
     <Provider store={store}>
        <Router />
     </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { history };