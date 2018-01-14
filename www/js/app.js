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
    $('#table-number').val('');
    $('.badge').remove();
});

$('.scan-qrcode').click(function() {
    cordova.plugins.barcodeScanner.scan(function(result) {
        if (result.text) {
            Materialize.toast('Table ' + result.text, 2000);
            $('#table-number').val(result.text);
        }
    }, function(error) {
        Materialize.toast('Erro ' + error, 2000, 'red-text');
    });
});

$('.action-confirm').click(function() {
    $.ajax({
        url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
        data: {
            mesa: $('#table-number').val(),
            pedido: $('#summary').text()
        },
        success: function(response) {
            Materialize.toast(response, 2000);
            $('#table-number').val('');
            $('.badge').remove();
        },
        error: function(error) {
            Materialize.toast(error.responseText, 3000, 'red-text');
        }
    });
});