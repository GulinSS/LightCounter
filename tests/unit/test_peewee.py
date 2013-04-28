# -*- coding: utf-8 -*-
# Date: 31.03.12
from datetime import datetime, date
from common import logger
__author__ = 'Гулин Сергей'

import unittest
from peewee import *

memory_db = SqliteDatabase(':memory:')

class MemoryModel(Model):
    class Meta:
        database = memory_db

class Blog(MemoryModel):
    creator = CharField()
    name = CharField()

class Entry(MemoryModel):
    blog = ForeignKeyField(Blog)
    title = CharField()
    body = TextField()
    pub_date = DateTimeField()
    published = BooleanField(default=True)

class Answer(Entry):
    author = CharField()
    
class PeeweeCase(unittest.TestCase):
    def test_peewee_sample(self):
        memory_db.connect()

        Blog.create_table()
        Entry.create_table()
        Answer.create_table()

        blog = Blog()
        blog.creator = 'Chuck'
        blog.name = 'Another blog'
        blog.save()

        update_query = Entry.update(published=True).where(pub_date__lt=datetime.today())
        update_query.execute()

        blog = Blog.get(id=1)
        blog.delete_instance()

        delete_query = Entry.delete().where(pub_date__lt=date(2012, 12, 12))
        delete_query.execute()

        for blog in Blog.select():
            print blog.name

        for entry in blog.entry_set:
            print entry.title

        for entry in blog.entry_set.order_by(('pub_date', 'desc')):
            print entry.title

        for entry in Entry.select().where(blog=blog, published=True):
            print '%s: %s (%s)' % (entry.blog.name, entry.title, entry.published)

        for entry in Entry.select().join(Blog).where(name='My Blog'):
            print entry.title

        for entry in Entry.select().order_by('id').paginate(2, 10):
            print entry.title

        Blog.select().join(Entry, 'left outer').annotate(Entry)

        memory_db.close()

        self.assertEqual(True, True)

if __name__ == '__main__':
    unittest.main()
