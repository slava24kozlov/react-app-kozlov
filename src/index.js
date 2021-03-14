import React from 'react';
import store from './redux/store';
import ReactDOM from "react-dom";
import App from "./App";

export let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}/>
        </React.StrictMode>, document.getElementById('root')
    );
}

renderEntireTree(store.getState());
store.subscriber(renderEntireTree);


