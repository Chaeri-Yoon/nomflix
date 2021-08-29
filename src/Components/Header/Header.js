import { Link, withRouter } from "react-router-dom"
import styled from "styled-components";

import { bodyColor } from "../GlobalStyles";

const Header = styled.nav`
    padding: 0;
    width: 100%;
    height: 50px;
    
    position: fixed;
    top: 0;
    z-index: 10;
    background-color: ${bodyColor};
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;
const List = styled.ul`
    display: flex;
`;
const Item = styled.li`
    padding: 18px 22px;
    margin-right: 10px;
    border-bottom: ${props => props.current ? "3px solid #3498DB" : "none"};
`;

export default withRouter(({location: {pathname}}) => (
    <Header>
            <List>
                <Item current = {pathname === "/"}>
                    <Link to="/">Movies</Link>
                </Item>
                <Item current = {pathname === "/tv"}>
                    <Link to="/tv">TV</Link>
                </Item>
                <Item current = {pathname === "/search"}>
                    <Link to="/search">Search</Link>
                </Item>
            </List>
        </Header>
));