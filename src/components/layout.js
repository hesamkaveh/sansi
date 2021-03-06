import React from "react"
import Header from './Header'
import Footer from './Footer'
import Slider from "./Slider";
import {graphql, StaticQuery} from "gatsby";
import styled, {keyframes} from "styled-components";
import GlobalStyle from "../global-styles";
import SeoTagGenerate from './SeoTagGenerator'
import {description, title} from '../../site-config'
const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    @media (max-width: 767px) { width: 99% !important;}
    @media (min-width: 768px) and (max-width: 991px) { width: 90% !important;}
    @media (min-width: 992px) and (max-width: 1200px) { width: 80% !important;}
    @media (min-width: 1200px) and (max-width: 1800px) { width: 80% !important;}
    @media (min-width: 1800px) { width: 60% !important;}
    @media (min-width: 991px) {.slider {max-width: 300px;}}
    @media (max-width: 991px) {.slider {flex-basis: unset !important;}}
`;
const PageBody = styled.div`
    direction: rtl;
    text-align: right;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0 -15px; 
`;
const Col = styled.div`
    -ms-flex-positive: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
    width: 100%;
    
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const HotPlace = styled(Col)`
    max-width: 780px;
    margin: 0 auto;
    animation: ${fadeIn} 300ms linear;

`;
const SliderContainer = styled(Col)`
    max-width: 780px;
    margin: 0 auto;
`;


export default ({children}) => (
    <StaticQuery
        query={graphql`
          query {
              allWordpressPost(limit:4) {
                edges {
                  node {
                    title
                    slug
                  }
                }
              }
                allWordpressCategory {
                    edges {
                      node {
                        name
                        slug
                      }
                    }
                  }
          }
    `}

        render={data => (
            <Container className='container-fluid' style={{direction: "rtl"}}>
                <GlobalStyle/>
                <SeoTagGenerate
                    type='blog'
                    description={description}
                    title={title}

                />
                <Header/>
                <PageBody>
                    <HotPlace>
                        {children}
                    </HotPlace>
                    <SliderContainer className="slider">
                        <Slider lastPost={data.allWordpressPost.edges}
                                allCategories={data.allWordpressCategory.edges}/>
                    </SliderContainer>
                </PageBody>
                <Footer/>
            </Container>

        )}
    />
)

// TODO:add custom seo tags if is not exist in children
// DefaultLayout.propTypes = {
//     location: PropTypes.object.isRequired,
// }
