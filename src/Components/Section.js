import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 600;

  display: block;
  margin-bottom: 20px;
`;
const Medias = styled("div")`
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`;

const Section = ({ title, children }) => (
    <Container>
      <Title>{title}</Title>
      <Medias>{children}</Medias>
    </Container>
);
export default Section;