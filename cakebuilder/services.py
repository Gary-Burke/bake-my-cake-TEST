from .models import Booking, TimeSlot


def get_available_slots(date):
    booked = Booking.objects.filter(delivery_date=date)\
        .values_list("time_slot", flat=True)

    return [
        slot for slot in TimeSlot.values
        if slot not in booked
    ]
