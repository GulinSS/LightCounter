# -*- coding: utf-8 -*-
# Date: 10.04.12
from datetime import datetime
from model.messages.command.Header import Header
from model.messages.gateway.StatementPostRequest import StatementPostRequest
from model.messages.info.CounterContract import CounterContract
from model.messages.info.FloorerContract import FloorerContract
from model.messages.info.StatementContract import StatementContract

from json import dumps, loads

__author__ = 'Гулин Сергей'

import unittest
import httplib

def build_request():
    counter_data = CounterContract(channel=0, id=0, value=1, date=datetime.now())
    floorer_data = FloorerContract(id=0, counters=[counter_data])
    data = StatementContract(floorers=[floorer_data])

    header = Header(arm=0)

    return StatementPostRequest(header=header, data=data)

class StatementTestCase(unittest.TestCase):
    def test_get(self):
        c = httplib.HTTPConnection("localhost", port=8000)
        c.request("GET", "/gateway/statement")
        result = c.getresponse()
        self.assertEqual(result.status, 200)
    def test_post(self):
        c = httplib.HTTPConnection("localhost", port=8000)
        request = build_request()
        body = request.serialize(request)
        body_json = dumps(body)
        print body_json
        c.request("POST", "/gateway/statement", body=body_json)
        result = c.getresponse()
        self.assertEqual(result.status, 200)
    #def test_post_published(self):
    #    c = httplib.HTTPConnection("213.156.210.221", port=8000)
    #    request = build_request()
    #    body = request.serialize(request)
    #    body_json = dumps(body)
    #    print body_json
    #    c.request("POST", "/statement", body=body_json)
    #    result = c.getresponse()
    #    self.assertEqual(result.status, 200)

if __name__ == '__main__':
    unittest.main()
