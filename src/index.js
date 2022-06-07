import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./modules/threads";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducer)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
