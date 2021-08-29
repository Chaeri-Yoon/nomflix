import {Link} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Image = styled.div`
    height: 180px;
    border-radius: 4px;

    background-image: url(${props => props.bgUrl});
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;

    transition: opacity .1s linear;
`;
const Rating = styled.span`
    position: absolute;
    bottom: 5px;
    right: 5px;

    opacity: 0;
    transition: opacity .1s linear;
`
const ImageContainer = styled.div`
    position: relative;
    margin-bottom: 5px;
    &:hover{
        ${Image}{
            opacity: 0.3;
        }
        ${Rating}{
            opacity: 1;
        }
    }
`;
const Title = styled.span`
    margin-bottom: 3px;
`;
const Year = styled.span`
    font-size: 10px;
    color: rgba(255,255,255,0.5);
`;
const Media = ({id, imgUrl, title, year, rating, isMovie = false}) => {
    return(
        <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
            <Container>
                <ImageContainer>
                    <Image bgUrl={
                        imgUrl
                        ? `https://image.tmdb.org/t/p/w300${imgUrl}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoH0QfMwCLX067AsgAevA1_wfdO5YVoHDPGw&usqp=CAU"
                    }/>
                    <Rating>
                        {`⭐ ${rating}/10`}
                    </Rating>
                </ImageContainer>
                <Title>{title}</Title>
                <Year>{year && year.substring(0, 4)}</Year>
            </Container>
        </Link>
    )
}
export default Media;