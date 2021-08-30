import styled from "styled-components";

import useDetail from "./useDetail";
import Loader from "../../Loader";
import AdditionalInfoContainer from "./AdditionalInfoContainer";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    padding-top: 30px;
`;
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgUrl});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.3;
    z-index: 0;
`;
const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;
const Poster = styled.div`
    width: 30%;
    background-image: url(${props => props.bgUrl});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;
const Information = styled.div`
    display: flex;
    flex-direction: column;

    width: 70%;
    margin-left: 10px;

    & > *{
        margin-bottom: 20px;
    }
`;
const Title = styled.h3`
    font-size: 32px;
`;
const ItemContainer = styled.div``;
const Year = styled.span``;
const Runtime = styled.span``;
const Genres = styled.span``;
const Imdb = styled.div`
    display: inline;
    & > a {
        color: yellow;
        font-size: 20px;
        vertical-align: middle;
    }   
`;
const Rating = styled.span`
    font-size: 10px;
`
const Description = styled.span`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;
const Detail = ({match: {params: {id}}, location: {pathname}}) => {
    const isMovie = pathname.includes("/movie/");
    const {
        mediaData, 
        loading, 
        error
    } = useDetail(id, isMovie);

    const numOfStars = mediaData && mediaData.vote_average && Math.floor(mediaData.vote_average / 2);
    let stars = [];
    for(let i = 0; i < 5; i++){
        if (i < numOfStars) stars.push('💛');
        else stars.push('🤍');
    }

    return(
        loading
        ? <Loader/>
        : (
            error
            ? "Can't get data"
            : (
                <Container>
                    <Backdrop bgUrl={mediaData.backdrop_path 
                                    ? `https://image.tmdb.org/t/p/original${mediaData.backdrop_path}`
                                    : null}/> 
                    <Content>
                        <Poster bgUrl={mediaData.poster_path 
                                    ? `https://image.tmdb.org/t/p/original${mediaData.poster_path}` 
                                    : "https://img.icons8.com/ios/50/000000/popcorn-time.png"}/>
                        <Information>
                            <Title>{isMovie ? mediaData.original_title : mediaData.original_name}</Title>
                            <ItemContainer>
                                <Year>
                                    {
                                        isMovie 
                                        ? `${mediaData.release_date.substring(0, 4)} · `
                                        : `${mediaData.first_air_date.substring(0, 4)} · `
                                    }
                                </Year>
                                <Runtime>
                                    {
                                        isMovie
                                        ? `${mediaData.runtime}mins · `
                                        : `${mediaData.episode_run_time}mins · `
                                    }
                                </Runtime>
                                <Genres>
                                    {mediaData.genres.length > 0 && mediaData.genres.map((genre, index) =>
                                        index === mediaData.genres.length - 1
                                        ? `${genre.name} · `
                                        : `${genre.name} / `
                                    )}
                                </Genres>
                                <Imdb>
                                    {mediaData.imdbID &&
                                        <>
                                            <a href={`https://imdb.com/title/${mediaData.imdbID}`} target="_blank">
                                                <i className="fab fa-imdb"></i> 
                                            </a>
                                            <span> · </span>
                                        </>
                                    }
                                </Imdb> 
                                <Rating>
                                    {stars.map((star, index) => <span key={index}>{star}</span>)}
                                </Rating>
                            </ItemContainer>
                            <Description>{mediaData.overview}</Description>
                            <AdditionalInfoContainer videos={mediaData.videos.results}
                                                    companies={mediaData.production_companies}
                                                    countries={mediaData.production_countries}
                                                    seasons={mediaData.seasons}
                            />
                        </Information>
                    </Content>
                </Container>           
            )
        )
    )
}
export default Detail;