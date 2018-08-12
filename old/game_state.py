from enum import Enum, auto

class NoValue(Enum):
    def __repr__(self):
        return '<%s.%s>' % (self.__class__.__name__, self.name)

class GameState(NoValue):
    START = auto()
    MAIN_TITLE = auto()