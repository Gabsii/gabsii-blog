module.exports = {
    siteMetadata: {
        title: 'Gatsby Default Starter',
        subtitle: 'test bro'
    },
    plugins: [
        'gatsby-plugin-react-helmet', {
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
        }
    ]
}
