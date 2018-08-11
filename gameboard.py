import pieces

class Spot:
    def __init__(self, piece, sub_y, sub_x):
        self.piece = piece
        self.sub_y = sub_y
        self.sub_x = sub_x

class Gameboard:
    def __init__(self):
        self.board_height = 24
        self.board_width = 80
        self.world_y = 0

        self.board = [[Spot(pieces.Piece(), 0, 0) for x in range(self.board_width)] for y in range(self.board_height)]

    def place_piece(self, piece, start_y, start_x):
        for y in range(len(piece.shape)):
            for x in range(len(piece.shape[0])):
                if piece.shape[y][x] == '1':
                    spot = self.board[start_y + y][start_x + x]
                    spot.piece = piece
                    spot.sub_y = y
                    spot.sub_x = x

    def scroll(self):
        self.board.pop(0) # remove top row
        self.board.append([Spot(pieces.Piece(), 0, 0) for x in range(self.board_width)]) # add a new row
        self.world_y += 1
