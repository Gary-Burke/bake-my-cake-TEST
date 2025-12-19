from django.db import models
from django.contrib.auth.models import User

SHAPE = ((1, "Square"), (2, "Rectangle"), (3, "Round"))
SIZE = ((1, "30 x 30cm"), (2, "50 x 50cm"), (3, "50 x 30cm"),
        (4, "60 x 45cm"), (5, "30cm"), (6, "50cm"))
TIER = ((1, 1), (2, 2), (3, 3))
SPONGE = ((1, "Vanilla"), (2, "Chocolate"),
          (3, "Coffee"), (4, "Carrot"), (5, "Lemon"))
ICING = ((1, "Buttercream"), (2, "Ganache"),
         (3, "Fondant"), (4, "Royal Icing"))
STATUS = ((1, "Ordered"), (2, "Completed"), (3, "Cancelled"))


# Create your models here.


class Order(models.Model):
    """
    Stores the complete cake order for the customer. 
    Related to :model:`auth.User` and :model:`Booking.pk`
    """
    customer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="customer_orders"
    )
    shape = models.IntegerField(choices=SHAPE, default=1)
    size = models.IntegerField(choices=SIZE, default=1)
    tier = models.IntegerField(choices=TIER, default=1)
    sponge = models.IntegerField(choices=SPONGE, default=1)
    icing = models.IntegerField(choices=ICING, default=1)
    message = models.CharField(max_length=200)
    theme = models.CharField(max_length=200)
    colours = models.CharField(max_length=200)
    quote = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.IntegerField(choices=STATUS, default=1)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_on"]


class TimeSlot(models.TextChoices):
    SLOT_11 = "11:00", "11:00 AM"
    SLOT_13 = "13:00", "1:00 PM"
    SLOT_15 = "15:00", "3:00 PM"
    SLOT_17 = "17:00", "5:00 PM"


class Booking(models.Model):
    delivery_date = models.DateField()
    time_slot = models.CharField(
        max_length=5,
        choices=TimeSlot.choices
    )
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, related_name="order_booking",
        null=True, blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("delivery_date", "time_slot")
