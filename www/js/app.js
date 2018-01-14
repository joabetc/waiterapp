$('.collection-item').on('click', function() {
    
    var $badge = $('.badge', this);
    
    if ($badge.length == 0) {
        $badge = $('<span class="badge brown-text">0</span>').appendTo(this);
    }

    $badge.text(parseInt($badge.text()) + 1);

    var productName = this.firstChild.textContent;
    Materialize.toast(productName + ' added', 1000);
});

$('#confirm').on('click', function() {

    var text = '';

    $('.badge').parent().each(function() {
        var product = this.firstChild.textContent;
        var quantity = this.lastChild.textContent;

        text += product + ': ' + quantity + ', ';
    });

    $('#summary').text(text);
});

$('.modal-trigger').leanModal();

$('.collection').on('click', '.badge', function() {
    $(this).remove();
    return false;
});

$('.action-clean').on('click', function() {
    $('.table-number').val('');
    $('.badge').remove();
});

$('.scan-qrcode').click(function() {
    cordova.plugins.barcodeScanner.scan(function(result) {
        alert(result.text);
    });
})