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
                        id="US"
                        value="US"
                        onChange={handleRadioChange}
                        defaultChecked
                    />
                    United States
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="EU"
                        value="EU"
                        onChange={handleRadioChange}
                    />
                    Europe
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="Asia"
                        value="AS"
                        onChange={handleRadioChange}
                    />
                    Asia
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="South America"
                        value="SA"
                        onChange={handleRadioChange}
                    />
                    South America (Hard)
                </label>
                <button type="submit">Start Game!</button>
            </form>
    )
}