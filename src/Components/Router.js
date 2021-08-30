import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Routes/Home";
import TV from "./Routes/TV";
import Detail from "./Routes/Detail";
import Search from "./Routes/Search";

const Router = () => {
    return(
        <HashRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/tv" component={TV}/>
                <Route path="/search" component={Search}/>
                <Route path="/movie/:id" component={Detail}/>
                <Route path="/show/:id" component={Detail}/>
                <Redirect from="*" to="/"/>
            </Switch> 
        </HashRouter>
    )
}
export default Router;