$(function () {
    $('.carousel').carousel({
        interval: false
    });
    var paginationLi = $('.pagination-list .page-number'),
        productThumbnail = $('section.product .thumbnail li'),
        sizeButton = $('.details .size button'),
        previewItem = $('section.products .item .preview'),
        increaseNumberOfCopy = $('.copies-number .plus'),
        decreaseNumberOfCopy = $('.copies-number .minus'),
        addToCart = $('section.product .cart'),
        shoppingCart = $('header .navbar .handbag'),
        shoppingCartIcon = $('section.products .item .icon-handbag'),
        shoppingCartModal = $('header .cart-modal'),
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
        inputFloatingLabel = $('input:not([type="submit"]), textarea'),
        numberOfCopiesAdded = $('section.product .cart .added-number'),
        profileTabChangerLeft = $('section.user-profile.with-tabs .changer.left'),
        profileTabChangerRight = $('section.user-profile.with-tabs .changer.right'),
        orderBtn = $('section.two-book .order'),
        orderContainer = $('section.two-book .options'),
        orderAddToCart = $('section.two-book .options .cart'),
        paymentCheckout = $('section.checkout .payment-methods .checkout');

function validate() {
    if ($(this).val().length === 0 || $(this).val() == 0) { // Show Error

        $(this).parents('.form-group').addClass('form-error').removeClass('form-info form-success');
        $(this).parents('.form-group').find('.error-message').addClass('show').end()
            .find('.info-message').removeClass('show').end()
            .find('.sucsess-message').removeClass('show');
    }
    else if ($(this).val().length !== 0 && $(this).val().length < 5) {

        $(this).parents('.form-group').addClass('form-info').removeClass('form-error form-success');
        $(this).parents('.form-group').find('.info-message').addClass('show').end()
            .find('.error-message').removeClass('show').end()
            .find('.sucsess-message').removeClass('show');
    }
    else { // No Errors
        $(this).parents('.form-group').addClass('form-success').removeClass('form-error form-info');
        $(this).parents('.form-group').find('.sucsess-message').addClass('show').end()
            .find('.info-message').removeClass('show').end()
            .find('.error-message').removeClass('show');
    }
}
    $('input[type=text]').blur( validate );
    $('input[type=email]').blur( validate );
    $('input[type=password]').blur( validate );
    $('input[type=tel]').blur( validate );
    $('textarea').blur( validate );
    $('select').blur( validate );

    $('form').on('submit', function (e) {

        $(this).find($('input, textarea, select')).blur();
        if( $(this).find('.form-group').hasClass('form-error') ) {
            e.preventDefault();
        }
    });
    paymentCheckout.on('click', function () {
       $('.checkout-form').submit()
    });

    $('header .responsive-menu .nav-link').on('click', function () {
       $( '.' + $(this).data('menu') ).addClass('show').removeClass('hide');
    });

    $('header .back').on('click', function () {
        $(this).parents('.level-2-menu').addClass('hide').removeClass('show');
    });
    
    $('header .navbar-toggler').on('click', function () {
        $('body').addClass('no-scroll');
        $('header .nav-wrapper').removeClass('hide').addClass('show').fadeIn();
        $('header .nav-wrapper .logo-menu').fadeIn();
        $('header .nav-wrapper .close-menu').fadeIn();
        $('.overlay-menu').fadeIn();
    });

    $('header .nav-wrapper .close-menu').on('click', closeResponsiveMenu );

    function closeResponsiveMenu() {
        $('body').removeClass('no-scroll');
        $('header .nav-wrapper').removeClass('show').addClass('hide');
        $('header .nav-wrapper .level-2-menu').removeClass('show').addClass('hide');
        $('header .nav-wrapper .logo-menu').fadeOut();
        $('header .nav-wrapper .close-menu').fadeOut();
        $('.overlay-menu').fadeOut();
    }
    $('body').on('click', function (e) {
        if(! $('body').hasClass('no-scroll') ) return;
        if(! $(e.target).hasClass('overlay-menu')) return;
        closeResponsiveMenu();
    });

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

    shoppingCart.on('click', function () {
        shoppingCartModal.fadeIn();
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
        var iconHandbag = $(e.target);
        if(iconHandbag.hasClass('icon-handbag')) {
            shoppingCartNumber.text(parseInt(shoppingCartNumber.text()) + 1);

            shoppingCartItemsParent.removeClass('empty');
            $('.empty-cart').hide();

            var itemImgSrc = iconHandbag.parents('.item').find('.item-image').find('img').attr('src');
            var itemImgAlt = iconHandbag.parents('.item').find('.item-image').find('img').attr('alt');
            var itemFlagSrc = iconHandbag.parents('.item').find('.item-flag').attr('src');
            var itemFlagAlt = iconHandbag.parents('.item').find('.item-flag').attr('alt');
            var itemTitle = iconHandbag.parents('.item').find('.item-title').text();

            var item =
                "<div class='item flex-shrink-0 position-relative added'>\n" +
                    "<button type='button' class='delete position-relative'>\n" +
                        "<span class='position-absolute' aria-hidden='true'>×</span>\n" +
                    "</button>\n" +
                    "\n" +
                    "<div class='item-image'>\n" +
                    "   <img src='"+itemImgSrc+"'"+" alt='"+itemImgAlt+"'"+ " height='131'>\n" +
                    "</div>\n" +
                    "<div class='item-body d-flex align-items-center position-absolute'>\n" +
                    "   <img src='"+itemFlagSrc+"'"+" class='img-fluid' alt='"+itemFlagAlt+"'"+ " width='30' height='30'>\n" +
                    "   <h5 class='item-title roboto-medium font-14 mb-0'>"+itemTitle+"</h5>\n" +
                    "</div>\n" +
                "</div>";

            shoppingCartItemsParent.append(item);
            if(localStorage.item) {
                localStorage.item += item;
            } else {
                localStorage.setItem('item', item);
            }

            if(shoppingCartNumber.hasClass('active')) return;
            shoppingCartNumber.addClass('active');
            shoppingCart.attr('src', 'img/handbag-active.svg');
        }
    });

    if(localStorage.item) {
        shoppingCartItemsParent.append(localStorage.getItem('item'));
        shoppingCartNumber.text(shoppingCartItemsParent.children('.item').length);
        shoppingCartNumber.addClass('active');
        shoppingCart.attr('src', 'img/handbag-active.svg');
    }

    if(shoppingCartItemsParent.children('.item').length === 0) {
        $('.empty-cart').show();
        shoppingCartItemsParent.addClass('empty')
    }

    if(shoppingCartItemsParent.children('.item').length === 0) {
        $('.empty-cart').fadeIn(3000);
        shoppingCartItemsParent.addClass('empty');
    }

    shoppingCartItemsParent.on('click','.delete', function () {
        $(this).parents('.item').addClass('deleted').removeClass('added');
        shoppingCartNumber.text(shoppingCartNumber.text() - 1);
        $(this).parents('.item').fadeOut();
        localStorage.setItem('item', shoppingCartItemsParent.find('.item.added').html() );
        if(shoppingCartItemsParent.children('.item').length === shoppingCartItemsParent.children('.item.deleted').length) {
            localStorage.clear();
            $('.empty-cart').fadeIn(3000);
            shoppingCartItemsParent.addClass('empty');
            shoppingCartNumber.removeClass('active');
            shoppingCart.attr('src', 'img/handbag.svg');
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

    profileTabChangerRight.on('click', function () {

        if( $(this).siblings('a.active').index() === $(this).siblings().length - 2 ) {
            profileTabChangerLeft.addClass('show').removeClass('hide');
            profileTabChangerRight.addClass('hide').removeClass('show');
            $(this).siblings('a.active').next().click();

        } else {
            $(this).siblings('a.active').next().click();
        }
    });
    profileTabChangerLeft.on('click', function () {

        if( $(this).siblings('a.active').index() === 2 ) {
            profileTabChangerLeft.addClass('hide').removeClass('show');
            profileTabChangerRight.addClass('show').removeClass('hide');
            $(this).siblings('a.active').prev().click();

        } else {
            $(this).siblings('a.active').prev().click();
        }
    });

    orderBtn.on('click', function () {
        orderContainer.fadeToggle();
    });
    orderAddToCart.on('click', function () {
        if(parseInt(numberOfCopies.text()) < 1) return;
        setTimeout(function () {
            orderContainer.fadeOut();
        }, 4000)
    });

    $('.secondry-address .delete-address').on('click', function () {
        $(this).parents('.secondry-address').fadeOut();
    });

    $('.account-info .edit-account-info').on('click', function () {
        $(this).hide();
        $('.account-info address').addClass('hide');
        $('.account-info .edit-account-form').fadeIn();
    });
    $('.account-info .edit-account-form').on('submit', function (e) {
        e.preventDefault();

        var asterisksPass = $('.account-info input[type=password]').val().replace(/./g, "*");

        $('.account-info .account-email').text( $('.account-info input[type=email]').val() );
        $('.account-info .account-password').text( asterisksPass );

        $('.account-info .edit-account-info').fadeIn();
        $(this).hide();
        $('.account-info address').fadeIn().removeClass('hide');
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
