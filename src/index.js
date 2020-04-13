import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import IndexApp from './components/Layout'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createStore } from 'redux';
import 'antd/dist/antd.css'

const tiger = 10000
//这是reducer
const reducer = (state = tiger, action) => {
    switch (action.type) {
        case '涨工资':
            return state += 100;
        case '扣工资':
            return state -= 100;
        default:
            return state;
    }
}
//创建store
const store = createStore(reducer);

render(
    <AppContainer >
        {/* <Provider store={store}> */}
            <BrowserRouter >
                <IndexApp/>
            </BrowserRouter>
        {/* </Provider> */}
    </AppContainer>
    ,
    document.getElementById('root')
);

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept();
}