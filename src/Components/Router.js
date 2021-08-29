import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Home from "./Routes/Home";
import TV from "./Routes/TV";
import Detail from "./Routes/Detail";

const Container = styled.div`
    padding: 20px
`;

const Router = () => {
    return(
        <HashRouter>
            <Header/>
            <Container>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/tv" component={TV}/>
                    <Route path="/search"/>
                    <Route path="/movie/:id" component={Detail}/>
                    <Route path="/show/:id" component={Detail}/>
                    <Redirect from="*" to="/"/>
                </Switch> 
            </Container>
        </HashRouter>
    )
}
export default Router;