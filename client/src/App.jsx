import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/custom-antd.css';

import AuthLanding from './Views/Auth/AuthLanding';

//importing components


function App() {

    return (
        <Router>
            <Route path="/" component={AuthLanding} exact />
            <Switch>

            </Switch>

        </Router>

    );
}

export default App;