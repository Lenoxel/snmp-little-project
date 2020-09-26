# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from .models import ManagedObject
from . import SNMP_implementation as snmp

def index(request):
    objects = ManagedObject.objects.order_by('objectType')
    
    context = {
        'objects': objects,
    }

    return render(request, 'index.html', context)

def sendSnmpMessage(request):
    if request.method == 'POST':
        hardwareTypePort = request.POST.get('hardwareTypePort')
        goalIp = request.POST.get('goalIp')
        community = request.POST.get('community')
        uniqueOid = request.POST.get('uniqueOid')

        response = snmp.main(hardwareTypePort, goalIp, community, uniqueOid)

        return HttpResponse(response)
        
    return render(request, "index.html")
    
