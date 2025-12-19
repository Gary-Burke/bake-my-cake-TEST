let order = {
    shape: "",
    size: "",
    tier: "",
    sponge: "",
    icing: "",
    message: "",
    theme: "",
    colours: "",
    quote: 0,
    status: "",
}

$(document).ready(function () {

    $('button[data-shape]').on('click', function () {
        const shape = $(this).data('shape');
        if (shape === 'square') {
            $('button[data-size="1"]').text('30 x 30cm');
            $('button[data-size="2"]').text('50 x 50cm');
        } else if (shape === 'rectangle') {
            $('button[data-size="1"]').text('50 x 30cm');
            $('button[data-size="2"]').text('60 x 45cm');
        } else {
            $('button[data-size="1"]').text('30cm');
            $('button[data-size="2"]').text('50cm');
        }

    });



    $("#delivery-date").flatpickr({
        minDate: new Date().fp_incr(7),
        dateFormat: "Y-m-d", // matches Django DateField
        disableMobile: true,

        onChange: function (selectedDates, dateStr) {
            loadTimeSlots(dateStr);
        }
    });

    function loadTimeSlots(date) {
        $.ajax({
            url: "/api/available-slots/",
            data: {
                date: date
            },
            success: function (response) {
                renderSlots(response.available_slots);
            }
        });
    }

    function renderSlots(availableSlots) {
        const allSlots = ["11:00", "13:00", "15:00", "17:00"];
        const container = $("#time-slots");

        container.empty();

        allSlots.forEach(function (slot) {
            const btn = $("<button>")
                .text(slot)
                .addClass("slot-btn");

            if (!availableSlots.includes(slot)) {
                btn.prop("disabled", true)
                    .addClass("disabled");
            }

            btn.on("click", function () {
                $(".slot-btn").removeClass("selected");
                $(this).addClass("selected");
            });

            container.append(btn);
        });
    }

    $("#delivery-date").flatpickr({
        disable: response.fully_booked_dates
    });

});