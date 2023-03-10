// Generated by https://quicktype.io

export interface Replay {
  map: Map;
  player: Player;
  date: string;
  version: Version;
  server: Server;
  players: Player[];
}

export interface Shots {
  total: number;
  directHit: number;
  penetration: number;
}

export interface Score {
  damages: number;
  assistance: Assistance;
  kills: number;
  xp: Xp;
  shots: Shots;
}

export interface Assistance {
  stun: number;
  spot: number;
  inspire: number;
  smoke: number;
  track: number;
  total: number;
}

export interface Xp {
  base: number;
}

export interface Map {
  name: string;
  displayName: string;
}

export interface Player {
  id: string;
  name: string;
  anonymizedName: string;
  isAnonymized: boolean;
  vehicle: Vehicle;
  score: Score;
}

export interface Nation {
  name: string;
  displayName: string;
  nationality: string;
}

export interface Vehicle {
  nation: Nation;
  name: string;
  displayName: string;
}

export interface Server {
  name: string;
  regionCode: string;
}

export interface Version {
  executable: string;
  xml: string;
}
