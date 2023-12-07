import React, { useState } from 'react'

interface FormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function DifficultyForm({onSubmit}: FormProps) {
    const [radioValue, setRadioValue] = useState('');

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
    };

    return (
        <form id="difficultyform" onSubmit={onSubmit}>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="easy"
                        value="Easy"
                        onChange={handleRadioChange}
                        defaultChecked
                    />
                    Easy
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="medium"
                        value="Medium"
                        onChange={handleRadioChange}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="hard"
                        value="Hard"
                        onChange={handleRadioChange}
                    />
                    Hard
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="impossible"
                        value="Impossible"
                        onChange={handleRadioChange}
                    />
                    Impossible (Proceed with caution!)
                </label>
                <button type="submit">Start Game!</button>
            </form>
    )
}