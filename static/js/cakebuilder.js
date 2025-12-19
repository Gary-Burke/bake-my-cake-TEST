$(document).ready(function () {

    let order = {
        shape: "",
        size: "",
        tier: 1,
        sponge: "",
        icing: "",
        message: "",
        theme: "",
        colours: "",
        quote: 0,
        status: "",
    }

    /**
     * Update order shape based on user selection.
     * Populate order size based on user selection of shape.
     */
    $("button[data-shape]").on("click", function () {
        const shape = $(this).data("shape");
        if (shape === "square") {
            $("button[data-size='small']").text("30 x 30cm");
            $("button[data-size='large']").text("50 x 50cm");
        } else if (shape === 'rectangle') {
            $("button[data-size='small']").text("50 x 30cm");
            $("button[data-size='large']").text("60 x 45cm");
        } else {
            $("button[data-size='small']").text("30cm");
            $("button[data-size='large']").text("50cm");
        }
        order.shape = shape;

        console.log(`Shape: ${order.shape}`); // TODO: Delete
    });


    /**
     * Update order size based on user selection
     */
    $("button[data-size]").on("click", function () {
        const size = $(this).data("size");
        if (order.shape === "square") {
            if (size === "small") {
                order.size = "30 x 30cm";
            } else {
                order.size = "50 x 50cm"
            }
        } else if (order.shape === "rectangle") {
            if (size === "small") {
                order.size = "50 x 30cm";
            } else {
                order.size = "60 x 45cm"
            }
        } else if (size === "small") {
            order.size = "30cm";
        } else {
            order.size = "50cm"
        }

        console.log(`Size: ${order.size}`); // TODO: Delete
    })


    $("button[data-tier]").on("click", function () {
        order.tier = $(this).data("tier");
        console.log(`Tier: ${order.tier}`); // TODO: Delete
    })


    $("button[data-sponge]").on("click", function () {
        order.sponge = $(this).data("sponge");
        console.log(`Sponge: ${order.sponge}`); // TODO: Delete
    })


    $("button[data-icing]").on("click", function () {
        order.icing = $(this).data("icing");
        console.log(`Icing: ${order.icing}`); // TODO: Delete
    })


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