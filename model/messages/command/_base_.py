from model.messages.command.Header import Header
from transport.ClassContract import ClassContract

class _Base_(ClassContract):
    #TODO: make class abstract via absmeta
    def __init__(self, header = None):
        pass
    
    header = Header()