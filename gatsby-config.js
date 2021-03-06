module.exports = {
    siteMetadata: {
        title: `حسام‌ کاوه`,
        subtitle: `با تلاش من و شما جهان بهتر خواهد شد. نوشته هایی در مورد پیشرفت شخصی، کسب و کار و برنامه نویسی`,
        siteUrl: "https://hesamkaveh.com"

    },
    plugins: [
        // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
        /*
         * Gatsby's data processing layer begins with “source”
         * plugins. Here the site sources its data from Wordpress.
         */
        {

            resolve: `gatsby-source-wordpress`,
            options: {
                baseUrl: `backend.hesamkaveh.com`,
                protocol: `https`, // The protocol. This can be http or https.
                // Indicates whether the site is hosted on wordpress.com.
                // If false, then the asumption is made that the site is self hosted.
                // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
                // If your site is hosted on wordpress.org, then set this to false.
                hostingWPCOM: false,
                // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
                // This feature is untested for sites hosted on Wordpress.com
                useACF: true,
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://hesamkaveh.com',
                sitemap: 'https://hesamkaveh.com/rss.xml',
                policy: [{userAgent: '*', allow: '/'}]
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-125787492-1",
                // Puts tracking script in the head instead of the body
                head: false,
                // Setting this parameter is optional
                // anonymize: true,
                // Setting this parameter is also optional
                // respectDNT: true,
                // Avoids sending pageview hits from custom paths
            },
        },
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://hesamkaveh.com`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,


        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
        {
          site {
            siteMetadata {
              title
              subtitle
              description:subtitle
              siteUrl
            }
          }
        }
      `,
                feeds: [
                    {
                        serialize: ({query: {site, allWordpressPost}}) => {
                            return allWordpressPost.edges.map(edge => {
                                return Object.assign({}, edge.node.title, {
                                    title: edge.node.title,
                                    description: (edge.node.acf != null) ? edge.node.acf.description : edge.node.content.slice(0, 158).replace(/(<([^>]+)>)/ig, ''),
                                    url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                    guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                    custom_elements: [{"content:encoded": edge.node.content}],
                                })
                            })
                        },
                        query: `
            { 
        allWordpressPost(sort: { fields: [date], order: DESC }) {
            edges {
              node {
                      date(formatString: "YYYY/MM/DD")
                acf{
                    description
                }

                  title
                  excerpt
                  content
                  content
                  slug
              }
            }
          }
          }
          `,
                        output: "/rss.xml",
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                sitemapSize: 2000
            }
        }
    ],
};
