# -*- coding: utf-8 -*-
# Date: 01.04.12
from datetime import datetime
from model.domain.services.StatementsAccounting import StatementsAccounting
from model.messages.command.Header import Header
from model.messages.gateway.StatementPostRequest import StatementPostRequest
from model.messages.info.CounterContract import CounterContract
from model.messages.info.FloorerContract import FloorerContract
from model.messages.info.StatementContract import StatementContract

__author__ = 'Гулин Сергей'

import unittest
import config
from model.domain import setup_db

config.sqlite_db = ":memory:"

class DomainCase(unittest.TestCase):
    def setUp(self):
        setup_db()

    def test_services_StatementsAccounting(self):
        counter_data = CounterContract(channel=0, id=0, value=1)
        floorer_data = FloorerContract(id=0, counters=[counter_data], date=datetime.now())
        data = StatementContract(floorers=[floorer_data])

        header = Header(arm=0)

        request = StatementPostRequest(header=header, data=data)

        StatementsAccounting.Post(request)

if __name__ == '__main__':
    unittest.main()
