$(document).ready(function () {
    $("#delivery-date").flatpickr({
        minDate: "today",
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