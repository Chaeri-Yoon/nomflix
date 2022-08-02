import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Helmet from "react-helmet";
import styled from "styled-components";

import Loader from "@components/Loader";
import AdditionalInfo from "@components/routes/Detail/AdditionalInfo";
import useApiCall from "@libs/useApiCall";
import { IMediaData } from "@src/types";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    padding-top: 30px;
`;
const Backdrop = styled.div<{ bgUrl: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgUrl});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${props => props.bgUrl === "" && "black"};
    filter: blur(3px);
    opacity: 0.2;
    z-index: 0;
`;
const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;
const Poster = styled.div<{ bgUrl: string }>`
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
const Detail = () => {
    const { pathname } = useLocation();
    const isMovie = pathname.includes("/movie/");
    const [getdata, { data, loading }] = useApiCall<IMediaData>(pathname);

    useEffect(() => {
        if (!loading) getdata({ params: { append_to_response: "videos" } });
    }, []);
    useEffect(() => {
        if (data) {
            numOfStars = data.vote_average && Math.floor(data.vote_average / 2);
            for (let i = 0; i < 5; i++) {
                if (i < numOfStars) stars.push('💛');
                else stars.push('🤍');
            }
        }
    }, [data]);

    let numOfStars;
    const stars: string[] = [];

    return (
        loading ? (
            <>
                <Helmet>
                    <title>Loading | Nomflix</title>
                </Helmet>
                <Loader />
            </>
        )
            : (
                data ? (
                    <Container>
                        <Helmet>
                            <title>
                                {data.original_title ? data.original_title : data.original_name}{" "}
                                | Nomflix
                            </title>
                        </Helmet>
                        <Backdrop bgUrl={data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : ""} />
                        <Content>
                            <Poster bgUrl={data.poster_path
                                ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                                : "https://img.icons8.com/ios/50/000000/popcorn-time.png"} />
                            <Information>
                                <Title>{isMovie ? data.original_title : data.original_name}</Title>
                                <ItemContainer>
                                    <Year>
                                        {
                                            isMovie
                                                ? `${data.release_date.substring(0, 4)} · `
                                                : `${data.first_air_date.substring(0, 4)} · `
                                        }
                                    </Year>
                                    <Runtime>
                                        {
                                            isMovie
                                                ? `${data.runtime}mins · `
                                                : `${data.episode_run_time[0]}mins · `
                                        }
                                    </Runtime>
                                    <Genres>
                                        {data.genres.length > 0 && data.genres.map((genre, index) =>
                                            index === data.genres.length - 1
                                                ? `${genre.name} · `
                                                : `${genre.name} / `
                                        )}
                                    </Genres>
                                    <Imdb>
                                        {data.imdbID &&
                                            <>
                                                <a href={`https://imdb.com/title/${data.imdbID}`} target="_blank">
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
                                <Description>{data.overview}</Description>
                                <AdditionalInfo videos={data.videos}
                                    companies={data.production_companies}
                                    countries={data.production_countries}
                                    seasons={data.seasons}
                                />
                            </Information>
                        </Content>
                    </Container>
                ) : null
            )
    )
}
export default Detail;