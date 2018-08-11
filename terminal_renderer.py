

class TerminalRenderer:
    def __init__(self, gameboard):
        self.gameboard = gameboard

    def clear(self):
        print('\x1b[2J\x1b[H')

    def render(self):
        board = self.gameboard.board
        output = ''
        
        for row in board:
            for spot in row:
                sprite = spot.piece.sprite
                char = sprite[spot.sub_y][spot.sub_x]
                output += char
            output += '\n'

        self.clear()
        print(output)
