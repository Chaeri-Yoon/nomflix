import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "@components/Header";
import Home from "@components/routes/Home";
import TV from "@components/routes/TV";
import Detail from "@components/routes/Detail";
import Search from "@components/routes/Search";
import Results from "@components/routes/Search/Results";

const Router = () => {
    return (
        <HashRouter>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tv" component={TV} />
                <Route path="/movie/:id" component={Detail} />
                <Route path="/show/:id" component={Detail} />
                <Route path="/search" component={Search} />
                <Redirect from="*" to="/" />
            </Switch>
        </HashRouter>
    )
}
export default Router;