import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Pages from './pages/Pages.jsx';
import Topbar from './components/Topbar.jsx';

function Router(){
    return(
        <BrowserRouter>
            {window.location.pathname !== "/" &&(
                <Topbar/>
            )}
            <Pages/>
        </BrowserRouter>
    )
}

export default Router;