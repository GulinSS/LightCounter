from common.peewee_adapter import Session
from model.domain.entities.Statement import Statement

def setup_db():
    Session.open()

    Statement.create_table(fail_silently=True)

    Session.close()
