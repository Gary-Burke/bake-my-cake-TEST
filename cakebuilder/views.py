from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from datetime import datetime
from .services import get_available_slots
from .forms import OrderForm

# Create your views here.


def cakebuilder_app(request):
    my_form = OrderForm()
    return render(
        request,
        'cakebuilder/cakebuilder.html',
        {
            "my_form": my_form,
        },
        )


@require_GET
def available_slots(request):
    date_str = request.GET.get("date")
    date = datetime.strptime(date_str, "%Y-%m-%d").date()

    slots = get_available_slots(date)

    return JsonResponse({
        "date": date_str,
        "available_slots": slots
    })
