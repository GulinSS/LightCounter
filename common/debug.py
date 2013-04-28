# -*- coding: utf-8 -*-
# Date: 12.06.12
import time

__author__ = 'Гулин Сергей'

def mock_time(f):
    def decorator(*args, **kw):
        time.sleep(1)
        return f(*args, **kw)
    return decorator