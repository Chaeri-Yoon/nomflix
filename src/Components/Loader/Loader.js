import useLoaderIcon from "./useLoaderIcon";
import styled from "styled-components";

const Loading = styled.span`
    font-size: 50px;

    width: 100%;
    display: flex;
    justify-content: center;
`;

const Loader = () => {
    const icon = useLoaderIcon();
    return <Loading>{icon}</Loading>
}


export default Loader;