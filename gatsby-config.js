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
        `gatsby-plugin-sitemap`, 
        {
            resolve: "gatsby-source-wordpress",
            options: {
                baseUrl: "wp.gabsii.com",
                protocol: "https",
                hostingWPCOM: false,
                useACF: true,
                verboseOutput: true,
                includedRoutes: [
                    "**/wp/**/categories",
                    "**/wp/**/posts",
                    "**/wp/**/users",
                  ],
            }
        }, 
        // {       
        //     resolve: '@pasdo501/gatsby-source-woocommerce',
        //     options: {
        //        // Base URL of Wordpress site
        //       api: 'wp.gabsii.com',
        //       // true if using https. otherwise false.
        //       https: true,
        //       api_keys: {
        //         consumer_key: 'ck_ac9fc87e3da6b07eb0db13c70a32d4689a08843e',
        //         consumer_secret: 'cs_fd3d4e02130babeb3114003b448f2be0b6546f9c'
        //       },
        //       // Array of strings with fields you'd like to create nodes for...
        //       fields: ['products', 'products/categories', 'orders'],
        //       api_version: 'wc/v3'
        //     }
        // },
        {
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
        }, 
        {
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
