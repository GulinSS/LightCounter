# -*- coding: utf-8 -*-
# Date: 29.03.12
__author__ = 'Гулин Сергей'

import unittest
from transport.ClassContract import ClassContract
from transport.Values import *

class A(ClassContract):

    def __init__(self, i = None):
        pass

    i = IntValue()

class SubA(A):
    def __init__(self, i = None, b = None):
        pass
    
    b = BoolValue()

class B(ClassContract):
    def __init__(self, dt = None, s = None, a = None):
        pass

    dt = DateTimeValue()
    s = StringValue()
    a = A()

class C(ClassContract):
    def __init__(self, string_array = None, obj_array = None):
            pass

    string_array = ArrayValue(StringValue())
    obj_array = ArrayValue(A)

class NameContract(ClassContract):
    @classmethod
    def contract(cls):
        return "Name"
    
    pass

correctB = {
    "B" : {
        "dt" : "2012-03-29T00:00:00",
        "s" : "qwerty",
        "a" : {
            "A" : {
                "i" : "0"
            }
        }
    }
}

correctB2 = {
    "B" : {
        "dt" : "2012-03-29T00:00:00",
        "s" : "qwerty",
        "a" : {
            "SubA" : {
                "i" : "0",
                "b" : "True"
            }
        }
    }
}

correctSubA = {
    "SubA" : {
        "i" : "0",
        "b" : "True"
    }
}

correctC = {
    "C" : {
        "string_array" : ["foo", "bar"],
        "obj_array" : {
            "A" : [ { "i" : "0" }, { "i" : "1" } ]
        }
    }
}

correctNameContract = {
    "Name" : {}
}

class TransportCase(unittest.TestCase):
    def test_nested_objects_serialization(self):
        b = B(dt=datetime(2012, 03, 29), s="qwerty", a=A(i=0))
        resultB = b.serialize(b)
        self.assertDictEqual(resultB, correctB)
    def test_nested_objects_deserialization(self):
        resultB = B.deserialize(correctB)
        b = B(dt=datetime(2012, 03, 29), s="qwerty", a=A(i=0))

        self.assertEqual(resultB.__class__, b.__class__)
        self.assertEqual(resultB.dt, b.dt)
        self.assertEqual(resultB.s, b.s)
        self.assertEqual(resultB.a.__class__, b.a.__class__)
        self.assertEqual(resultB.a.i, b.a.i)
        self.assertEqual(resultB.a.i, b.a.i)
    def test_child_class_serialization(self):
        subA = SubA(i=0, b=True)
        subASer = subA.serialize(subA)
        self.assertDictEqual(subASer, correctSubA)
    def test_child_class_deserialization(self):
        resultSubA = SubA.deserialize(correctSubA)
        subA = SubA(i=0, b=True)

        self.assertEqual(resultSubA.__class__, subA.__class__)
        self.assertEqual(resultSubA.i, subA.i)
        self.assertEqual(resultSubA.b, subA.b)
    def test_arrays_serialization(self):
        c = C(string_array=["foo", "bar"], obj_array=[A(i=0), A(i=1)])
        resultC = c.serialize(c)
        self.assertDictEqual(resultC, correctC)
    def test_arrays_deserialization(self):
        resultC = C.deserialize(correctC)
        c = C(string_array=["foo", "bar"], obj_array=[A(i=0), A(i=1)])

        self.assertEqual(resultC.string_array[0], c.string_array[0])
        self.assertEqual(resultC.string_array[1], c.string_array[1])
        self.assertEqual(resultC.obj_array[0].i, c.obj_array[0].i)
        self.assertEqual(resultC.obj_array[1].i, c.obj_array[1].i)
    def test_name_setting_serialization(self):
        nc = NameContract()
        resultNC = nc.serialize(nc)
        self.assertDictEqual(resultNC, correctNameContract)
    def test_polymorphism_serialization(self):
        b = B(dt=datetime(2012, 03, 29), s="qwerty", a=SubA(i=0,b=True))
        resultB = b.serialize(b)
        self.assertDictEqual(resultB, correctB2)
    def test_polymorphism_deserialization(self):
        resultB = B.deserialize(correctB2)
        b = B(dt=datetime(2012, 03, 29), s="qwerty", a=SubA(i=0,b=True))

        self.assertEqual(resultB.__class__, b.__class__)
        self.assertEqual(resultB.dt, b.dt)
        self.assertEqual(resultB.s, b.s)
        self.assertEqual(resultB.a.__class__, b.a.__class__)
        self.assertEqual(resultB.a.i, b.a.i)
        self.assertEqual(resultB.a.b, b.a.b)

if __name__ == '__main__':
    unittest.main()
