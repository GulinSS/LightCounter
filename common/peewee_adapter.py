# -*- coding: utf-8 -*-
# Date: 01.04.12
__author__ = 'Гулин Сергей'

import config
import peewee

_sqlite_db = peewee.SqliteDatabase(config.sqlite_db)

class DomainModel(peewee.Model):
    class Meta:
        database = _sqlite_db

class Session(object):

    @staticmethod
    def open():
        _sqlite_db.connect()

    @staticmethod
    def close():
        _sqlite_db.close()
