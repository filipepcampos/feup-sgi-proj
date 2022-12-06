# SGI 2022/2023 - TP3

## Group: T0xG0y

| Name             | Number    | E-Mail             |
| ---------------- | --------- | ------------------ |
| John Doe         | 201801010 | ...                |
| Jane Doe         | 201801011 | ...                |

----
## Project information

- (items describing main strong points)
- Scene
  - (Brief description of the created scene)
  - (relative link to the scene)
----
## Issues/Problems

- (items describing unimplemented features, bugs, problems, etc.)

## Draft

### SXS relevant ids
- Board
- Piece 1 & 2
- King 1 & 2
- Auxiliar board

### Game Classes
- MyPiece
- MyTile
- MyGameBoard
- MyGameMove
- MyGameSequence
- MyWindowsMovieMaker
- MyGameCTO (also has state referenec and method to change it)

### Game States
Note: States receive needed information on constructor

- MenuState
  - Start Button
  - Game Time (consider using total time instead of turn time) (optionally)
  - Background
  - Scene Selection (button for each scene like mario kart)
- LoadingSceneState
  - backend de carregar tudo
  - loading screen (low priority, check if makes sense)
- Next Turn
  - Parameter with player number
  - Allow to select piece
  - If no play available OR time ends, end game
  - Highlight possible pieces (low priority, check if makes sense)
- RenderPossibleMoves
  - Parameter with player number and piece (and gameboard)
  - Render possible destinations animation
- Destination Selection
  - Parameter with player number and possible moves (and gameboard)
  - If time ends, end game
  - Select valid destination
- Movement Animation
  - Paramenter with game move
  - Animate selected play
- HasGameEnded
  - Check if game ended and change state
- EndGame
  - Display game stats
  - Button to menu
