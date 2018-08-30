let colors = {
    background: '#191414', // main background
    backgroundLite: '#363B3F', // background for elements
    backgroundBlog: '#E7E7E7',
    font: '#FFFFFF', // all texts
    fontSecondary: '#B3B3B3', // text color for UI elements
};

let breakpoints = {
    //only focuses on width
    small: 375, // [0;375] 375x667 small Smartphones
    medium: 760, // ]375;760] large Smartphones
    large: 980, // ]760;980] Tablets
    xlarge: 1280 // ]980;1280] Laptops (everything else is DESKTOP FIRST)
};

module.exports = {
    colors: colors,
    breakpoints: breakpoints
};
