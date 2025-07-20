import words from './words.json';
import {Engine, MersenneTwister19937, shuffle} from "random-js";

export default class WordProvider {
    private readonly engine: Engine;
    private _words: string[] = words;

    constructor(private _seed: number) {
        this.engine = MersenneTwister19937.seed(this._seed);
        shuffle(this.engine, this._words);
    }

    public get words(): string[] {
        return this._words;
    }
}
