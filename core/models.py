# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class ManagedObject(models.Model):
    objects = models.Manager()

    objectId = models.CharField('OID', max_length=100)
    objectType = models.CharField('Tipo', max_length=200)

    class Meta:
        verbose_name = 'Objeto'
        verbose_name_plural = 'Objetos'
        ordering = ['objectType']

    def __str__(self):
        return self.objectId
