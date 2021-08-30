import styled from "styled-components"
import useAdditionalInfoShow from "./useAdditionalInfoShow";

const Container = styled.div``;
const Tabs = styled.ul`
    list-style-type: none;
    display: flex;

    margin-bottom: 20px;
`;
const Tab = styled.li`
    margin-right: 10px;
`;
const Button = styled.button`
    font-size: 12px;
    font-weight: 600;
    color: rgba(20, 20, 20, 0.5);
    background-color: yellow;
    border: none;
    border-radius: 10px;
`;
const Information = styled.div``;
const VideoContainer = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);

    grid-gap: 25px;
`;
const Video = styled.iframe`
    width: 100%;
    height: 135px;
`;

const ProductionContainer = styled.div`
    width: 100%;
    display: flex;
`;
const Production = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const Country = styled.span`
    margin-bottom: 20px;
`;
const CompanyContainer = styled.div`
    margin-left: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 30px);
    grid-auto-flow: column;
    grid-gap: 50px;
`;
const Company = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Logo = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${props => props.logoUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    background-color: ${props => !props.logoUrl && "black"};
    border-radius: ${props => !props.logoUrl && "50%"};
`;
const CompanyName = styled.span`
    transform: scale(0.7);
    opacity: 0.7;
    margin-bottom: 5px;
    text-align: center;
`;

const AdditionalInfoContainer = ({videos, companies, countries}) => {
    const {videoButton, productionButton, showVideo, showProduction} = useAdditionalInfoShow();
    
    videos = videos && videos.filter((video, index) => index < 2);
    let countriesText = "";
    if(countries.length > 0){
        for(let i = 0; i < countries.length; i++){
            if(i < countries.length - 1)    countriesText += `${countries[i].iso_3166_1} | `;
            else countriesText += `${countries[i].iso_3166_1}`;
        }
    }
    return (
        <>
            <Container>
                <Tabs>
                    {
                        videos.length > 0 &&
                        <Tab><Button ref={videoButton}>Videos</Button></Tab>
                    }
                    {
                        companies.length > 0 &&
                        <Tab><Button ref={productionButton}>Production</Button></Tab>
                    }
                </Tabs>
                <Information>
                {showVideo && <VideoContainer>
                                    {
                                        videos.length > 0 && videos.map(
                                            (video, index) => <Video key={index} src={`//www.youtube.com/embed/${video.key}`}/>
                                        )
                                    }
                                </VideoContainer>
                }
                {showProduction &&  <ProductionContainer>
                                        {
                                            <Production>
                                                {
                                                    countriesText !== "" 
                                                    && <Country>{`Producted in ${countriesText}`}</Country>
                                                }
                                                <CompanyContainer>
                                                    {
                                                        companies.length > 0 && companies.map(
                                                            (company, index) => (
                                                                <Company>
                                                                    <Logo logoUrl={company.logo_path
                                                                                        ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                                                                                        : null
                                                                                    }
                                                                    />
                                                                    <CompanyName>{company.name}</CompanyName>
                                                                </Company>
                                                            )
                                                        )
                                                    }
                                                </CompanyContainer>
                                            </Production>
                                        }
                                    </ProductionContainer>
                }
                </Information>
            </Container>
        </>
    )
}
export default AdditionalInfoContainer;