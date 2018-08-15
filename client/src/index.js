import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MRoute from './routes/index';
import { Provider } from "react-redux";
import store from './state/store.js'
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
<Provider store={store}>
    <MRoute />
</Provider>,
    document.getElementById('root')
);

registerServiceWorker();
