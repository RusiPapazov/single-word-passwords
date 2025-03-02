import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import words from './words.json';

const App: () => ReactElement = (): ReactElement => {
    const [word, setWord] = useState<string>('');

    const tick: () => void = (): void => {
        const now = new Date();

        const index: number = now.getMinutes() % words.length;
        setWord(words[index]);
    };

    useEffect((): () => void => {
        const interval = setInterval(tick, 1000);

        return (): void => clearInterval(interval);
    });

    return (
        <div>
            <span className="word-of-the-hour">{word}</span>
        </div>
    );
};

export default App;
