import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const bodyColor = "rgba(20,20,20,1)";
const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    button:hover{
        cursor: pointer;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:12px;
        background-color: ${bodyColor};
        color:white;
        padding: 50px 0;
    }
`;

export default globalStyles;