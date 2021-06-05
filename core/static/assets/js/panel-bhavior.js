$("#element-modal, #compat-modal").on('shown.bs.modal', function () {
    $("body").removeClass("modal-open");
    $("this .custom-modal").removeClass("modal");
    $(".modal-backdrop").remove();
});
// Modal Background active changes end

// Element modal logic start

// Open Element Modal on startup
$(document).ready(function() {
    $("#element-modal").show();
    $("#element-modal-viewmode-btn").hide();  
});

// On modal open, show View Mode button only when Compatibility modal is visisble, hide Compatibility button.
$("#element-modal").on("shown.bs.modal", function () {
    if (!$("#compat-modal").is(":visible")) {
        $("#element-modal-compat-btn").show();
        $("#element-modal-viewmode-btn").hide();
    }
});

// Open Compatibility modal on Compatibility button click.
$("#element-modal-compat-btn").attr({
    "data-toggle": "modal",
    "data-target": "#compat-modal"
});

// Show Compatibility button only when Compatibility modal is not visisble, hide View Mode button.
$("#compat-modal").on("shown.bs.modal", function () {
    $("#element-modal-compat-btn").hide();
    $("#element-modal-viewmode-btn").show();
});

// Show View Mode button only when Compatibility modal is visisble, hide Compatibility button.
$("#compat-modal").on("hidden.bs.modal", function () {
    $("#element-modal-compat-btn").show();
    $("#element-modal-viewmode-btn").hide();
});

$('#element-modal-viewmode-btn').on('click', function() {
    $("#compat-modal").modal('hide');
});

// Element modal logic end

// Compat modal logic start

$(document.body).on('click', '#compat-dropdown-menu button', function () {
    const pointCloudId = $(this).text();
    const pointCloudInfo = $(this).text();

    $('#compat-dropdown-btn').text(pointCloudId);
    // $('#compat-info-span').text(getElementInfoFromTypeString(pointCloudId));
});

// Compat modal logic end