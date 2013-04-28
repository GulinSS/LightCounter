from datetime import datetime
from transport.ClassContract import ClassContract
from transport.Values import IntValue, DateTimeValue

class Header(ClassContract):
    last_id = 0

    def __init__(self, arm = None):
        self.__class__.last_id += 1
        self.id = self.__class__.last_id
        self.date = datetime.now()

    id = IntValue()
    arm = IntValue()
    date = DateTimeValue()

    def update_date(self):
        self.currentDate = datetime.now()

    def update_id(self):
        self.__class__.last_id += 1
        self.id = self.__class__.last_id
