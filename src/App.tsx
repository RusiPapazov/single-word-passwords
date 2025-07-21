import React, {JSXElementConstructor, ReactElement, useEffect, useState} from 'react';
import './App.css';
import WordProvider from './WordProvider';
import useScrollToTop from "./hooks/useScrollToTop";

const TIME: number = 86400000;
const INTERVAL: number = 60 * 1000;

const wordProvider = new WordProvider(Math.floor(Date.now() / TIME));

const pad = (n: number): string => n.toString().padStart(2, '0');

const App = (): ReactElement<void, JSXElementConstructor<void>> => {
    const [word, setWord] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const tick = (): void => {
        const now = new Date();

        const words: string[] = wordProvider.words;
        const intervalsSinceHour: number = Math.floor((now.getTime() % (60 * 60 * 1000)) / INTERVAL);

        setWord(words[intervalsSinceHour % words.length]);
        setTimeLeft(getTimeLeft(now));
    };

    const formatTimeLeft= (ms: number): string  => {
        if (ms === 0) {
            return '';
        }

        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    const getTimeLeft = (now: Date): number => INTERVAL - (now.getTime() % INTERVAL);

    useEffect(() => {
        const interval = setInterval(tick, 1000);

        return (): void => clearInterval(interval);
    });
    useScrollToTop();

    return <>
        <span className="word-of-the-hour">{word}</span>
        <span className="time-left">{formatTimeLeft(timeLeft)}</span>
    </>;
};

export default App;
