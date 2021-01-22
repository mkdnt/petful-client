import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './main-components/App';
import { BrowserRouter } from 'react-router-dom';
import { PetfulContextProvider } from './context';

ReactDOM.render(
<BrowserRouter>
    <PetfulContextProvider>
        <App />
    </PetfulContextProvider>
</BrowserRouter>, 
document.getElementById('root'))
