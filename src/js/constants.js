let colors = {
    background: '#191414', // main background
    backgroundLite: 'transparent', // background for elements
    backgroundBlog: '#E7E7E7',
    font: '#000', // all texts
    fontSecondary: '#B3B3B3', // text color for UI elements
};

let breakpoints = {
    //only focuses on width
    small: 375, // [0;375] 375x667 small Smartphones
    medium: 760, // ]375;760] large Smartphones
    large: 980, // ]760;980] Tablets
    xlarge: 1280 // ]980;1280] Laptops (everything else is DESKTOP FIRST)
};

let config = {
    host: 'localhost',
    hostPort: 8000,
    wordpressURL: 'http://localhost:8001/wp-json/wp/v2'
}

module.exports = {
    colors: colors,
    breakpoints: breakpoints,
    config: config
};
