// Hide compatibility modal on start - done using HTML
$(document).ready(() => {
    $('#compat-panel').hide();
    $('#element-modal-viewmode-btn').hide();
});

// Clicking on campatibility check button should open Compatibility modal
$(document.body).on("click", "#element-modal-compat-btn", () => {
    $('#compat-panel').show();
    $('#element-modal-compat-btn').hide();
    $('#element-modal-viewmode-btn').show();
});

// Clicking on View Mode button should close Compatibility modal
$(document.body).on("click", "#element-modal-viewmode-btn", () => {
    $('#compat-panel').hide();
    $('#element-modal-compat-btn').show();
    $('#element-modal-viewmode-btn').hide();
});

$(document.body).on('click', '#compat-panel-select option', function () {
    const pointCloudId = $(this).text();
    const pointCloudInfo = $(this).text();

    let prefixText = $('#compat-info-span').text();
    $('#compat-info-span').text(prefixText + pointCloudInfo);
});
