export default function HomePage() {
    return (
        <>
            <h2>Geography Guesser</h2>
            <p>How to get started? Simply click "New Game" above!</p>
            <table className="features">
                <thead>
                    <tr>
                        <th>Our new features</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>By Popular Request: We now report scores in miles instead of kilometers</td>
                    </tr>
                    <tr>
                        <td>Difficulty Selector: We now added the IMPOSSIBLE difficulty.</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}