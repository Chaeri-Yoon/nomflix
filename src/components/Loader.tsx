import styled from "styled-components";
import useLoaderIcon from "@libs/useLoaderIcon";

const Loading = styled.span`
    font-size: 50px;

    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const Loader = () => {
    const icon = useLoaderIcon();
    return <Loading>{icon}</Loading>
}


export default Loader;