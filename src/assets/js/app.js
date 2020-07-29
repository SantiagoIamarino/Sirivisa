let currentPage = 1;
let lastPage = null;

$(document).ready(()=>{
    currentPage = 1;
    lastPage = null;

    let distance;

    function handleScroll(action){
        $('#js_messenger_value')[0].value = action;

        $('#js_messenger').click();
    }

    $('body').bind('touchmove', function(e){
        if(!distance) {
            distance = e.originalEvent.changedTouches[0].clientY;
        } else {
            if((distance + 100) < e.originalEvent.changedTouches[0].clientY){
                handleScroll('up');
                distance = 0;
            } else if((distance - 100) > e.originalEvent.changedTouches[0].clientY) {
                handleScroll('down');
                distance = 0;
            }
        }
    })

    $('#mobile_header_scroll').on('click', () => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $('.mobile-content .filters').offset().top
        }, 500);
    })

    $('html, body').on('click', (e) => {

        if(window.innerWidth >= 1000) { 
            return; //Desktop version
        }

        //Checking if is clicking inside navbar options
        if($(e.target).closest('.navbar-options').length > 0) { 
            return;
        }

        //Checking if is clicking navbar menu button
        if($(e.target).closest('.navbar-btn').length > 0) { 
            return;
        }

        if($('.navbar-options').hasClass('fadeInRight')) {
            $('.navbar-options').removeClass('fadeInRight');
        }

        $('.navbar-options').css({
            'animation-name': 'fadeOutRight'
        })
    })
})

function slideMobileNavbar() {
    $('.navbar-options').css({
        'animation-name': 'fadeInRight',
        'display': 'block'
    })
}

function setHtmlHidden(){
    $('html').css({
        'overflow': 'hidden'
    })
}

function removeHtmlHidden(){
    $('html').css({
        'overflow': 'visible'
    })
}

function slideCategories() {
    $('.mobile-content .filters .categories ul').slideToggle(300);
}

function navigate(scrollTo, nextPage, isMobile = false){
    if(!isMobile) {
        scrollTo = '#category_' + scrollTo;
    } else{
        scrollTo = '#mobile_category_' + scrollTo;
        currentPage = scrollTo;
    }

    lastPage = currentPage;
    currentPage = nextPage;

    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top
    }, 500);

    const optionToSetActive = '#option_' + currentPage.toString();
    const optionToRemoveActive = '#option_' + lastPage.toString();

    $(optionToRemoveActive).removeClass('active');
    $(optionToSetActive).addClass('active');

    distance = 0;
}

function leftNavigate(scrollTo, page){
    scrollTo = '#category_' + scrollTo;
    lastPage = currentPage;
    currentPage = page;

    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top
    }, 500);

    const optionToSetActive = '#option_' + currentPage.toString();
    const optionToRemoveActive = '#option_' + lastPage.toString();

    $(optionToRemoveActive).removeClass('active');
    $(optionToSetActive).addClass('active');
}

let position = {};
let marginLeft = {};
const windowsWidth = window.innerWidth;
const marginBetweenPosts = windowsWidth * 0.02;

function postsNavigate(categoryId, action) {
    const postsContainer = $('#' + categoryId + ' .posts-container');
    const posts = $('#' + categoryId + ' .post');

    if(!position[categoryId]) {
        position[categoryId] = 0;
    }

    const thisPosition = position[categoryId];

    if(action === 'next' && thisPosition >= 0 && thisPosition < posts.length - 1) {
        const postWidth = posts[thisPosition].offsetWidth;

        if(!marginLeft[categoryId]){
            marginLeft[categoryId] = 0;
        }
        marginLeft[categoryId] += (postWidth + marginBetweenPosts) * - 1;
        
        $(postsContainer).css({
            'margin-left':  marginLeft[categoryId].toString() + 'px'
        })

        removeActiveClass(thisPosition, action, posts);

        position[categoryId] += 1;
    }

    if(action === 'prev' && thisPosition > 0) {
        const postWidth = posts[thisPosition - 1].offsetWidth;

        if(!marginLeft[categoryId]){
            marginLeft[categoryId] = 0;
        }
        marginLeft[categoryId] -= (postWidth + marginBetweenPosts) * - 1;
        
        $(postsContainer).css({
            'margin-left':  marginLeft[categoryId].toString() + 'px'
        })

        removeActiveClass(thisPosition, action, posts);

        position[categoryId] -= 1;
    }
}

function removeActiveClass(position, action, posts) {
    if(action === 'prev') {
        const lastElement = $(posts[position])[0];
        const nextElement = $(posts[position - 1])[0];
        
        $(lastElement).removeClass('active');
        $(nextElement).addClass('active');
    } else {
        const lastElement = $(posts[position])[0];
        const nextElement = $(posts[position + 1])[0];
        
        $(lastElement).removeClass('active');
        $(nextElement).addClass('active');
    }
}

function changeImage(categoryIndex, postIndex, imageIndex, postImages){
    let image = 'category_' + categoryIndex + '_post_' + postIndex + '_image';
    image = document.getElementById(image);
    changePostImageState(image, 'add');
    image.src = postImages[imageIndex].secure_url;

    const post = document.getElementById('category_' + categoryIndex + '_post_' + postIndex);
    const buttons = post.getElementsByClassName('navigation-button');
    const activeButton = post.getElementsByClassName('navigation-button active')[0];
    
    $(activeButton).removeClass('active');
    $(buttons[imageIndex]).addClass('active');
}

function changePostImageState(image, action) {
    if(action === 'remove') {
       $(image).closest('.post-image').removeClass('loading');
    } else {
        $(image).closest('.post-image').addClass('loading');
    }
    
}


// Load admin scripts and destroy

function loadScript() {
    body = document.body;
    let script = document.createElement('script');
    script.id = 'admin_scripts_loader';
    script.innerHTML = '';
    script.src = 'assets/admin/scripts/main.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);

    let head = document.head;

    let link = document.createElement('link');
    link.id = 'admin_styles_loader';
    link.href = 'assets/css/bootstrap.css';
    link.rel = 'stylesheet';
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
};

function destroyScript() {
    const scriptLoader = document.getElementById('admin_scripts_loader');

    body.removeChild(scriptLoader);

    let head = document.head;

    const stylesLoader = document.getElementById('admin_styles_loader');

    head.removeChild(stylesLoader);
}