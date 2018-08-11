import time
import threading

from gameboard import Gameboard
from terminal_renderer import TerminalRenderer
from keyboard_input import KeyboardInput
from player_manager import PlayerManager
from game_manager import GameManager

gboard = Gameboard()
renderer = TerminalRenderer(gboard)
inputer = KeyboardInput()
player = PlayerManager(gboard)
game = GameManager(gboard)

inputer.start()
game.start()

def game_loop():
    for i in range(25):
        nput = inputer.get_input()
        player.update(nput)
        game.update()
        renderer.render()
        time.sleep(.05) # TODO: Calculate exact sleep time

thread = threading.Thread(target=game_loop)
thread.start()
thread.join()
