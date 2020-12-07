import "babel-polyfill";
// import about_button from './about_button.js';
// import about from './about.js';
// import about1 from './about1.js';
// import about2 from './about2.js';

import art_sub from './art_sub.js';
import art from './art.js';
import index_menu_uiux from './index_menu_uiux.js';
import index from './index.js';
import slide from './slide.js';
import artSub from './art_sub.js';

function init(){

    var pageUrl = location.pathname,
        pageS = pageUrl.lastIndexOf('/')+1,
        pageE = pageUrl.lastIndexOf('.'),
        pageName = pageUrl.slice(pageS, pageE);

        switch(pageName){
            case 'index': break;
            case 'index_menu':
                slide(); index_menu_uiux(); art();
            break;
        }



    // about_button();
    // artSub();

    
    
    
    

    

}

window.addEventListener('DOMContentLoaded',init);