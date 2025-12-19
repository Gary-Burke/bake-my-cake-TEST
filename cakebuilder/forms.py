from django import forms
from .models import Order


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = (
            "shape",
            "size",
            "tier",
            "sponge",
            "icing",
            "message",
            "theme",
            "colours",
            "quote",
        )
