export interface Game {
  status: string;
  moves: GameMove[];
  playerToMove: number;
}

export interface GameMove {
  x: string;
  y: number;
  result: boolean;
  playerId: number;
}
