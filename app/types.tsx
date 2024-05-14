export interface User {
  id: number;
  email: string;
  passwordHash: string;
  games: Game[];
}

export interface Game {
  id: string;
  status: string;
  moves: GameMove[];
  player1: User;
  player2: User;
}

export interface GameMove {
  x: string;
  y: number;
  result: boolean;
  playerId: number;
}
