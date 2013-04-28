# -*- coding: utf-8 -*-
# Date: 01.04.12
__author__ = 'Гулин Сергей'

from common.peewee_adapter import Session
from model.domain.entities.Statement import Statement
from model.messages.arm.CloseSessionRequest import CloseSessionRequest
from model.messages.gateway.StatementPostResponse import StatementPostResponse

class StatementsAccounting(object):

    @staticmethod
    def Post(request): #StatementPostRequest
        data = request.data
        header = request.header

        statements = [Statement(header.arm, counter.id, floorer.id, counter.date, counter.state, counter.value, counter.channel) \
                        for floorer in data.floorers \
                            for counter in floorer.counters]

        Session.open()
        map(lambda statement: statement.save(), statements)
        Session.close()

        request.header.update_date()
        request.header.update_id()

        internal_request = CloseSessionRequest()
        response = StatementPostResponse(header = request.header, request = internal_request)

        return response