import threading
from inputs import Input

class KeyboardInput:
    def __init__(self):
        ...

    def start(self):
        ...

    def get_input(self):
        return Input(
            player_up=False,
            player_down=False,
            player_left=False,
            player_right=False
        )
