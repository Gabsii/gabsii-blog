module.exports = {
    siteMetadata: {
        title: 'Gabsii',
        subtitle: 'modern.vintage',
        siteUrl: 'https://gabsii.com'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-glamor`,
        `gatsby-plugin-sitemap`, {
            resolve: "gatsby-source-wordpress",
            options: {
                baseUrl: "wp.gabsii.com",
                protocol: "https",
                hostingWPCOM: false,
                useACF: true,
                verboseOutput: true
            }
        }, {
            resolve: 'gatsby-plugin-page-transitions',
            options: {
                transitionTime: 200
            }
        }, {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: `black`,
                // Disable the loading spinner.
                showSpinner: true
            }
        }, {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-125589344-1",
                head: true,
                anonymize: true,
                respectDNT: true
            }
        }, {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Gabsii modern.vintage",
                short_name: "Gabsii",
                start_url: "/",
                background_color: "#191414",
                theme_color: "#191414",
                display: "standalone",
                icon: "src/img/icon.png", // This path is relative to the root of the site.
            }
        },
        `gatsby-plugin-offline`
    ]
}
