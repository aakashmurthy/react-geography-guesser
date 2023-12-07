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
                        value="US"
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
                        value="EU"
                        onChange={handleRadioChange}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="hard"
                        value="AS"
                        onChange={handleRadioChange}
                    />
                    Hard
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="impossible"
                        value="SA"
                        onChange={handleRadioChange}
                    />
                    Impossible (Proceed with caution!)
                </label>
                <button type="submit">Start Game!</button>
            </form>
    )
}