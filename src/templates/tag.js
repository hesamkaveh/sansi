import React, {Component} from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import PostPrev from "../components/PostPrev";
import {title} from '../../site-translate'
import SeoTagGenerate from "../components/SeoTagGenerator";


class PageTemplate extends Component {
    render() {
        const Posts = this.props.data.allWordpressPost;
        const currentTag = this.props.data.wordpressTag;

        return (
            <Layout>
                <SeoTagGenerate type='blog'
                                title={`${currentTag.name} | ${title}`}
                                description={currentTag.description}
                />
                <h1 className='categoryName'>{currentTag.name}</h1>
                <h3 className='categoryDescription'>{currentTag.description}</h3>
                <hr/>
                {Posts ?
                    Posts.edges.map(({node}) => (
                        <PostPrev node={node} key={node.slug}/>
                    )) :
                    null}

            </Layout>
        )
    }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
  wordpressTag(id:{eq:$id}) {
  id
  name
  description
}
    allWordpressPost(filter: {tags: { elemMatch:{id: {eq: $id}}}}) {
    edges {
      node {
        id
        title
        excerpt
        content
        slug
        tags {
          name
        }
          featured_media {
              alt_text
              localFile {
                  childImageSharp{
                      fluid(maxWidth:750){
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
              media_details {
                  width
                  height
                  file
              }
          }

      }
    }
  }
      
        site {
      siteMetadata {
        title
        subtitle
      }
    }
}

  
  

`;
