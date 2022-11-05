import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'antd/dist/custom-antd.css';

import AuthLanding from './Views/Auth/AuthLanding';
import AppLanding from "./Views/AppLanding/AppLanding.jsx";

//importing components


function App() {

    return (
        <Router>
            <Route path="/" component={AuthLanding} exact/>
            <Switch>
                <Route path="/app" component={AppLanding} exact/>
            </Switch>

        </Router>

    );
}

export default App;