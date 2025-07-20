import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import words from './words.json';

const pad = (n: number): string => n.toString().padStart(2, '0');

const App = (): ReactElement => {
    const [word, setWord] = useState<string>('');
    const [now, setNow] = useState<Date>(new Date());
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const tick = (): void => {
        const newNow = new Date();
        setNow(newNow);

        const index: number = newNow.getMinutes() % words.length;
        setWord(words[index]);
        setTimeLeft(getTimeLeft());
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

    const getTimeLeft = (): number => {
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        return (60 - seconds) * 1000 - milliseconds;
    };

    useEffect(() => {
        const interval = setInterval(tick, 1000);

        return (): void => clearInterval(interval);
    });

    return (
        <>
            <span className="word-of-the-hour">{word}</span>
            <span className="time-left">{formatTimeLeft(timeLeft)}</span>
        </>
    );
};

export default App;
