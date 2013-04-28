# -*- coding: utf-8 -*-
# Date: 10.06.12
from view.LocalResource import LocalResource
from view.scoreboard.pages.Counter import Counter
from view.scoreboard.pages.Desk import Desk
from view.scoreboard.pages.Root import Root
from view.scoreboard.resources.ARM import ARM
from view.scoreboard.resources.Floorer import Floorer
from view.scoreboard.resources.Range import Range

__author__ = 'Гулин Сергей'

def ScoreboardBuilder():
    scoreboard = Root()
    scoreboard.desk = Desk()
    #scoreboard.counter = Counter()

    scoreboard.resources = LocalResource()
    scoreboard.resources.range = Range()
    scoreboard.resources.arm = ARM()
    scoreboard.resources.floorer = Floorer()

    return scoreboard