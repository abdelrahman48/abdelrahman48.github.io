$(function () {
    $('.carousel').carousel({
        interval: false
    });

    $('a').on('click', function (e) { e.preventDefault()} );

    var paginationLi = $('.pagination-list .page-number'),
        productThumbnail = $('section.product .thumbnail li'),
        sizeButton = $('section.product .details .size button'),
        copyNumber = $('section.product .copies-number span'),
        addCopy = $('section.product .copies-number .plus'),
        removeCopy = $('section.product .copies-number .minus');

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
        copyNumber.text(parseInt(copyNumber.text()) + 1)
    });
    removeCopy.on('click', function () {
        if(parseInt(copyNumber.text()) < 1) return;
        copyNumber.text(parseInt(copyNumber.text()) - 1)
    })
});
