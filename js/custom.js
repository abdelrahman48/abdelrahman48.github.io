$(function () {
    $('.carousel').carousel({
        interval: false
    });

    $('a').on('click', function (e) { e.preventDefault()} );

    var paginationLi = $('.pagination-list .page-number'),
        productThumbnail = $('section.product .thumbnail li'),
        sizeButton = $('.details .size button'),
        addCopy = $('.copies-number .plus'),
        removeCopy = $('.copies-number .minus'),
        thumbnailLi = $('section.product .modal-body .thumbnail li'),
        thumbnailArrowLeft = $('section.product .modal-body .left'),
        thumbnailArrowright = $('section.product .modal-body .right'),
        addToCart = $('section.products .item .handbag'),
        shoppingCart = $('header .navbar .handbag'),
        shoppingCartNumber = $('header .navbar .cart-number'),
        editItemOptions = $('section.shopping-cart .details .edit'),
        finishEditItemOptions = $('section.shopping-cart .details .done'),
        hiddenItemOptions = $('section.shopping-cart .details .hidden'),
        visibleItemOptions = $('section.shopping-cart .details .visible'),
        deleteItem = $('section.shopping-cart .details .delete');

    paginationLi.on('click', function () {
        $(this).addClass('active').siblings('.page-number').removeClass('active');
    });
    $('.pagination-list .left').on('click', function () {
        if( paginationLi.filter('.active').index() === 1 ) return;
        paginationLi.filter('.active').removeClass('active').prev('.page-number').addClass('active');
    });
    $('.pagination-list .right').on('click', function () {
        if( paginationLi.filter('.active').index() === paginationLi.length ) return;
        paginationLi.filter('.active').removeClass('active').next('.page-number').addClass('active');
    });

    for(i = 0; i < 2; i++) {
        $('.category-list .item').clone().insertAfter(".category-list .item:last");
    }

    productThumbnail.on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    });

    sizeButton.on('click', function () {
        $(this).addClass('active').siblings('button').removeClass('active');
    });

    addCopy.on('click', function () {
        $(this).siblings('.number').text(parseInt($(this).siblings('.number').text()) + 1)
    });
    removeCopy.on('click', function () {
        if(parseInt($(this).siblings('.number').text()) < 1) return;
        $(this).siblings('.number').text(parseInt($(this).siblings('.number').text()) - 1)
    });

    $('.category-list').on('click', function (e) {
        if(e.target.tagName === 'I') {
            if (shoppingCartNumber.text() === '') {
                shoppingCartNumber.text('0')
            }
            shoppingCartNumber.text(parseInt(shoppingCartNumber.text()) + 1);
            shoppingCartNumber.addClass('active');
            shoppingCart.attr('src', 'img/handbag-active.svg');
        }
    });

    thumbnailArrowLeft.on('click', function () {
        if( thumbnailLi.filter('.active').index() === 0 ) return;
        thumbnailLi.filter('.active').removeClass('active').prev('li').addClass('active');
    });
    thumbnailArrowright.on('click', function () {
        if( thumbnailLi.filter('.active').index() === thumbnailLi.length - 1 ) return;
        thumbnailLi.filter('.active').removeClass('active').next('li').addClass('active');
    });

    editItemOptions.on('click', function () {
        $(this).parents('.details').find($('.hidden')).removeClass('hide');
        $(this).parents('.details').find($('.visible')).addClass('hide')
    });
    finishEditItemOptions.on('click', function () {
        $(this).parents('.details').find($('.hidden')).addClass('hide');
        $(this).parents('.details').find($('.visible')).removeClass('hide')
    });

    deleteItem.on('click', function () {
        $(this).parents('.shopping-item').fadeOut();
    });
});
// Shopping Cart Box Modal Scroll
var slider = document.querySelector('header .cart-modal .modal-body'),
    isDown = false,
    startX,
    scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft,
        walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
});
