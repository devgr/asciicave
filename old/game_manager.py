import pieces
from game_state import GameState

class GameManager:
    def __init__(self, gameboard):
        self.gameboard = gameboard
        self.state = GameState.START
        self.scroll_factor = 1 # Wait this many frames between scrolls
        self.frames_since_scroll = 0

    def transition_state(self, new_state):
        if new_state == GameState.MAIN_TITLE:
            self.load_main_title()

    def start(self):
        self.transition_state(GameState.MAIN_TITLE)

    def load_main_title(self):
        # Show title
        title = pieces.MainTitle()
        start_y = int(self.gameboard.board_height - len(title.shape)) # start at bottom
        start_x = int((self.gameboard.board_width - 1) / 2 - len(title.shape[0]) / 2) # centered
        self.gameboard.place_piece(title, start_y, start_x)
        self.scroll_factor = 5

    def update(self):
        if self.frames_since_scroll >= self.scroll_factor:
            self.gameboard.scroll()
            self.frames_since_scroll = 0
        else:
            self.frames_since_scroll += 1