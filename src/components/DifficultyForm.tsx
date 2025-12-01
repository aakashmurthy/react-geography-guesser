import React from 'react'

interface FormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function DifficultyForm({onSubmit}: FormProps) {
    return (
        <form id="difficultyform" onSubmit={onSubmit}>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="US"
                        value="US"
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
                    />
                    Europe
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="Asia"
                        value="AS"
                    />
                    Asia
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        id="South America"
                        value="SA"
                    />
                    South America (Hard)
                </label>
                <button type="submit">Start Game!</button>
            </form>
    )
}