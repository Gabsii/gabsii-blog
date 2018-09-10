module.exports = {
    siteMetadata: {
        title: 'Gatsby Default Starter',
        subtitle: 'test bro'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-glamor`, {
            resolve: "gatsby-source-wordpress",
            options: {
                baseUrl: "localhost:8001",
                protocol: "http",
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
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Gabsii",
                short_name: "Gabsii modern.vintage",
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
