# -*- coding: utf-8 -*-
# Date: 04.04.12
__author__ = 'Гулин Сергей'

from transport.Value import Value

class ClassContractType(type):
    _info = {} # TODO: объединить поля внизу в это
    _known = {} # словарь имя->тип обработанных
    _bases = {} # список базовых классов у обработанных
    _processed = {} # специальные свойства базовых классов

    @classmethod
    def build_inspected(mcs, cls, bases, root = None):
        if root is None:
            root = cls

        map(lambda base: mcs.build_inspected(base, mcs._bases[base.__name__], root), \
            filter(lambda base: mcs._bases.has_key(base.__name__), \
                   bases))

        if not mcs._processed.has_key(cls.__name__):
            mcs._processed[cls.__name__] = {}
            for k,v in cls.__dict__.items():
                if isinstance(v, Value):
                    mcs._processed[cls.__name__][k] = v

        for k,v in mcs._processed[cls.__name__].items():
            setattr(root, k, ValueHandler(v, k))

    def __new__(mcs, name, bases, attributes):
        cls = super(ClassContractType, mcs).__new__(mcs, name, bases, attributes)

        if not bases:
            return cls

        if name is "ClassContract":
            return cls

        mcs._known[cls.contract()] = cls
        mcs._bases[cls.__name__] = bases
        mcs.build_inspected(cls, bases)

        return cls

class ClassContract(Value): #TODO: ClassValue
    __metaclass__ = ClassContractType

    def __new__(cls, *args, **kwargs):
        obj = super(ClassContract, cls).__new__(cls, kwargs)

        map(lambda (k,v): setattr(obj, k, v), kwargs.items())

        return obj

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

    @classmethod
    def contract(cls):
        return cls.__name__

    @classmethod #TODO: протечка абстракции
    def serialize(cls, obj = None): #TODO: raise exception on obj = None :-)
        root = {}

        for k,v in obj.__class__.__dict__.items():
            if isinstance(v, ValueHandler):
                root[k] = v(obj)

        return { obj.contract() : root }

    @classmethod #TODO: протечка абстракции
    def deserialize(cls, obj):
        root_class_name = obj.keys()[0]
        root_class = ClassContract.__metaclass__._known[root_class_name] #TODO: проверка на ошибки
        root_object = root_class()
        root_serial_fields = obj[root_class_name]
        for k,v in root_serial_fields.items():
           root_field = root_class.__dict__[k]
           root_field(root_object, v)

        return root_object

class ValueHandler(object):
    def __init__(self, value_header, value_name):
        self.value_name = "__"+value_name
        self.value_header = value_header

    def __get__(self, instance, instance_type=None):
        return getattr(instance, self.value_name)

    def __set__(self, instance, value):
        setattr(instance, self.value_name, value)

    def __call__(self, instance,  *args):
        if not args.__len__(): # пусто
            return self.value_header.serialize(getattr(instance, self.value_name))
        else:
            setattr(instance, self.value_name, self.value_header.deserialize(args[0]))