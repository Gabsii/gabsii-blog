module.exports = {
    siteMetadata: {
        title: 'Gabsii',
        subtitle: 'modern.vintage',
        siteUrl: 'https://gabsii.com'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-glamor`,
        `gatsby-plugin-postcss`,
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
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
                id: "GTM-PZ4TDZF",

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: true,

                // Specify optional GTM environment details.
                // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
                // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
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
