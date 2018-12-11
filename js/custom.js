$(function () {
    $('.carousel').carousel({ /* run bootstrap slider */
        interval: false
    });

    $(window).resize(function () {
    /*$('.width').text($(this).outerWidth());*/ /* to see page size in IE browser */
       if( $(this).outerWidth() < 775) { /* fix image in print-provider section in home page in IE browser in small screen */
           $('.ie-support').addClass('fixed');
        }
    });

/*    $('button.RTL').on('click', function () { /!* toggle between arabic and english version *!/
        if (! $('html').attr('dir') ) {
            $('html').attr('dir','rtl');
            $('.bootstrap-rtl-css').attr('href', 'components/bootstrap-4.1.3/css/bootstrap-rtl.min.css');
            $('.custom-rtl-css').attr('href', 'css/custom-rtl.css');
        } else {
            $('html').attr('dir','');
            $('.bootstrap-rtl-css').attr('href', '');
            $('.custom-rtl-css').attr('href', '');
        }
    });*/
    $('.RTL').on('click', function () {
       localStorage.clear();
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

function validate() { /* form validate */
    if ($(this).val().length === 0 || $(this).val() == 0) { // Show Error
        $(this).parents('.form-group').addClass('form-error').removeClass('form-success');
        $(this).parents('.form-group').find('.error-message').addClass('show');
    }
/*    else if ($('input[type=text]').val().length < 3) {
        $(this).parents('.form-group').addClass('form-error').removeClass('form-success');
        $(this).parents('.form-group').find('.error-message').addClass('show');
    }
    else if ($('input[type=password]').val().length < 3) {
        $(this).parents('.form-group').addClass('form-error').removeClass('form-success');
        $(this).parents('.form-group').find('.error-message').addClass('show');
    }*/
    else { // No Errors
        $(this).parents('.form-group').addClass('form-success').removeClass('form-error');
        $(this).parents('.form-group').find('.error-message').removeClass('show');
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
       $('.checkout-form').submit();
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
        $('.category-list .item-link').clone().insertAfter(".category-list .item-link:last");
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
        $(this).siblings('.number').text( parseInt( $(this).siblings('.number').text() ) + 1);
    });
    decreaseNumberOfCopy.on('click', function () {
        if( parseInt( $(this).siblings('.number').text() ) < 1) return;
        $(this).siblings('.number').text( parseInt( $(this).siblings('.number').text() ) - 1);
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
            if($('html').is('[dir]')) {
                shoppingCart.attr('src', '../img/handbag-active.svg');
            } else {
                shoppingCart.attr('src', 'img/handbag-active.svg');
            }
        }
    });

    $('.category-list').on('click', function (e) { // add item to shopping cart when click on shopping icon
        var iconHandbag = $(e.target);
        if(iconHandbag.hasClass('icon-handbag')) {
            shoppingCartNumber.text(parseInt(shoppingCartNumber.text()) + 1);
            $('header .cart-modal .modal-header .number').text( parseInt(shoppingCartNumber.text()) );

            shoppingCartItemsParent.removeClass('empty');
            $('.empty-cart').hide();

            var itemImgSrc = iconHandbag.parents('.item-link').find('.item-image').find('img').attr('src');
            var itemImgAlt = iconHandbag.parents('.item-link').find('.item-image').find('img').attr('alt');
            var itemFlagSrc = iconHandbag.parents('.item-link').find('.item-flag').attr('src');
            var itemFlagAlt = iconHandbag.parents('.item-link').find('.item-flag').attr('alt');
            var itemTitle = iconHandbag.parents('.item-link').find('.item-title').text();

            var item =
                "<div class='item flex-shrink-0 position-relative'>\n" +
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

            shoppingCartItemsParent.find('.items-parent').append(item);
            if(localStorage.item) {
                localStorage.item += item;
            } else {
                localStorage.setItem('item', item);
            }

            if(shoppingCartNumber.hasClass('active')) return;
            shoppingCartNumber.addClass('active');
            if($('html').is('[dir]')) {
                shoppingCart.attr('src', '../img/handbag-active.svg');
            } else {
                shoppingCart.attr('src', 'img/handbag-active.svg');
            }
        }
    });

    $('section.products .item-link').on('click', function (e) {
        var that = $(e.target);
        if( that.hasClass('icon-handbag') || that.hasClass('preview') ) {
            e.preventDefault()
        }
    });

   if(localStorage.item) {
        shoppingCartItemsParent.find('.items-parent').append(localStorage.getItem('item'));
        shoppingCartNumber.text(shoppingCartItemsParent.find('.item').length);

       $('header .cart-modal .modal-header .number').text( parseInt(shoppingCartNumber.text()) );
        shoppingCartNumber.addClass('active');
       if($('html').is('[dir]')) {
           shoppingCart.attr('src', '../img/handbag-active.svg');
       } else {
           shoppingCart.attr('src', 'img/handbag-active.svg');
       }
    }

    if(shoppingCartItemsParent.find('.item').length === 0) {
        $('.empty-cart').show();
        shoppingCartItemsParent.addClass('empty')
    }

    shoppingCartItemsParent.on('click','.delete', function () {
        shoppingCartNumber.text(shoppingCartNumber.text() - 1);

        $(this).parents('.item').fadeOut(1000, function () {
            $(this).remove();

            localStorage.setItem('item', shoppingCartItemsParent.find('.items-parent').html());
            if(shoppingCartItemsParent.find('.item').length === 0) {
                localStorage.clear();
                $('.empty-cart').fadeIn(1000);
                shoppingCartItemsParent.addClass('empty');
                shoppingCartNumber.removeClass('active');
                if($('html').is('[dir]')) {
                    shoppingCart.attr('src', '../img/handbag.svg');
                } else {
                    shoppingCart.attr('src', 'img/handbag.svg');
                }
            }
        });
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
    $('form label').on('click', function () {
        $(this).addClass('active')
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

    $('.sender-info-checkbox').on('click', function () {
        if($(this).is(':checked')) {
            $('.sender-info-input').removeClass('d-flex').addClass('d-none');
        } else {
            $('.sender-info-input').removeClass('d-none').addClass('d-flex');
        }
    });
    $('.gift-checkbox').on('click', function () {
        if($(this).is(':checked')) {
            $('.gift').fadeIn();
        } else {
            $('.gift').fadeOut();
        }
    });

    $('.forget-account').on('click', function () {
        $(this).parents('.login-form').find('.login-inputs').hide();
        $(this).parents('.login-form').find('.forget-login-inputs').fadeIn();
    })
});

// Shopping Cart Box Modal Scroll
var slider = document.querySelector('header .cart-modal .modal-body'),
    isDown = false,
    startX,
    scrollLeft;

slider.addEventListener('mousedown', function (e) {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', function () {
    isDown = false;
});

slider.addEventListener('mouseup', function () {
    isDown = false;
});

slider.addEventListener('mousemove', function (e) {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft,
        walk = (x - startX) * .4;
    slider.scrollLeft = scrollLeft - walk;
});
