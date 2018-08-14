

class Piece:
    def __init__(self):
        self.sprite = ['.']
        self.shape = ['1']

class MainTitle(Piece):
    def __init__(self):
        self.sprite = ['ASCII FARMER']
        self.shape =  ['1111111111']