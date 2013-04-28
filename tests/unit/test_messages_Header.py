# -*- coding: utf-8 -*-
# Date: 10.04.12
__author__ = 'Гулин Сергей'

import unittest

from model.messages.command.Header import Header


class HeaderCase(unittest.TestCase):
    def test_id_increment(self):
        Header.last_id = 0
        
        h = Header()
        last = h.__class__.last_id
        self.assertEqual(h.id, last)
        self.assertEqual(h.id, 1)

        h.update_id()
        last = h.__class__.last_id
        self.assertEqual(h.id, last)
        self.assertEqual(h.id, 2)

if __name__ == '__main__':
    unittest.main()
