$(function () {
    $('.carousel').carousel({
        interval: false
    });

    $('a').on('click', function (e) { e.preventDefault()} );

    var paginationLi = $('.pagination-list .page-number'),
        productThumbnail = $('section.product .thumbnail li'),
        sizeButton = $('.details .size button'),
        previewItem = $('section.products .item .preview'),
        increaseNumberOfCopy = $('.copies-number .plus'),
        decreaseNumberOfCopy = $('.copies-number .minus'),
        addToCart = $('section.product .cart'),
        shoppingCart = $('header .navbar .handbag'),
        shoppingCartNumber = $('header .navbar .cart-number'),
        numberOfCopies = $('.copies-number .number'),
        shoppingCartItemsParent = $('header .cart-modal .modal-body'),
        thumbnailLi = $('.thumbnail li'),
        thumbnailArrowLeft = $('section.product .left'),
        thumbnailArrowright = $('section.product .right'),
        editItemOptions = $('section.shopping-cart .details .edit'),
        finishEditItemOptions = $('section.shopping-cart .details .done'),
        deleteItem1 = $('header .cart-modal .delete'),
        deleteItem2 = $('section.shopping-cart .details .delete'),
        sortOption = $('section.products .sort-wrapper .dropdown-toggle'),
        sortOptions = $('section.products .sort-wrapper .dropdown-item'),
        inputFloatingLabel = $('input:not([type="submit"])'),
        numberOfCopiesAdded = $('section.product .cart .added-number');

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

    for(i = 0; i < 2; i++) { // generate multiply items divs by clone only 3 items
        $('.category-list .item').clone().insertAfter(".category-list .item:last");
    }

    productThumbnail.on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    });

    sizeButton.on('click', function () {
        $(this).addClass('active').siblings('button').removeClass('active');
    });

    previewItem.on('click', function () {
        numberOfCopies.text('0');
    });

    increaseNumberOfCopy.on('click', function () {
        numberOfCopies.text(parseInt(numberOfCopies.text()) + 1);
    });
    decreaseNumberOfCopy.on('click', function () {
        if(parseInt(numberOfCopies.text()) < 1) return;
        numberOfCopies.text(parseInt(numberOfCopies.text()) - 1);
    });

    addToCart.on('click', function () {
        if(parseInt(numberOfCopies.text()) < 1) return;
        shoppingCartNumber.text( parseInt(shoppingCartNumber.text()) + parseInt(numberOfCopies.text()) );

        numberOfCopiesAdded.text( parseInt(numberOfCopies.text()) + '+' );
        numberOfCopiesAdded.addClass('active');
        setTimeout(function () {
            numberOfCopiesAdded.removeClass('active')
        }, 1500);

        if (parseInt(numberOfCopies.text()) > 0) {
            if(shoppingCartNumber.hasClass('active')) return;
            shoppingCartNumber.addClass('active');
            shoppingCart.attr('src', 'img/handbag-active.svg');
        }
    });

    $('.category-list').on('click', function (e) { // add item to shopping cart when click on shopping icon
        if(e.target.tagName === 'I') {
            shoppingCartNumber.text(parseInt(shoppingCartNumber.text()) + 1);

            if(shoppingCartNumber.hasClass('active')) return;
            shoppingCartNumber.addClass('active');
            shoppingCart.attr('src', 'img/handbag-active.svg');
        }
    });

    thumbnailLi.on('click', function () { // change item's img when click on thumbnail imgs
        $( '.' + $(this).children().data('img') ).fadeIn().addClass('active').siblings('.active').removeClass('active').hide()
    });

    thumbnailArrowLeft.on('click', function () {
        if( thumbnailLi.filter('.active').index() === 0 ) return;
        thumbnailLi.filter('.active').removeClass('active').prev('li').addClass('active');

        $('.image').children('.active').hide().removeClass('active')
            .prev().fadeIn().addClass('active');
    });
    thumbnailArrowright.on('click', function () {
        if( thumbnailLi.filter('.active').index() === thumbnailLi.length - 1 ) return;
        thumbnailLi.filter('.active').removeClass('active').next('li').addClass('active');

        $('.image').children('.active').hide().removeClass('active')
            .next().fadeIn().addClass('active')
    });

    editItemOptions.on('click', function () {
        $(this).parents('.details').find($('.hidden')).removeClass('hide');
        $(this).parents('.details').find($('.visible')).addClass('hide')
    });
    finishEditItemOptions.on('click', function () {
        $(this).parents('.details').find($('.hidden')).addClass('hide');
        $(this).parents('.details').find($('.visible')).removeClass('hide')
    });

    deleteItem1.on('click', function () {
        $(this).parents('.item').fadeOut().addClass('deleted');
        if(shoppingCartItemsParent.children('.item.deleted').length === shoppingCartItemsParent.children('.item').length) {
            $('.empty-cart').fadeIn(3000);
            shoppingCartItemsParent.addClass('empty')
        }
    });
    deleteItem2.on('click', function () {
        $(this).parents('.shopping-item').fadeOut();
    });

    sortOptions.on('click', function () {
        sortOption.text($(this).text());
    });

    inputFloatingLabel.on('blur', function () {
       if($(this).val() === '') {
            $(this).siblings('.floating-label').removeClass('active')
       } else {
           $(this).siblings('.floating-label').addClass('active')
       }
    });
});

// Shopping Cart Box Modal Scroll
var slider = document.querySelector('header .cart-modal .modal-body'),
    isDown = false,
    startX,
    scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft,
        walk = (x - startX) * .4;
    slider.scrollLeft = scrollLeft - walk;
});
