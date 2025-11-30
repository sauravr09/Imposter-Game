import { useState } from 'react'
import './App.css'

// Pre-loaded list of football/soccer players
const FOOTBALL_PLAYERS = [
  'Lionel Messi',
  'Cristiano Ronaldo',
  'Kylian Mbappé',
  'Erling Haaland',
  'Kevin De Bruyne',
  'Mohamed Salah',
  'Virgil van Dijk',
  'Karim Benzema',
  'Robert Lewandowski',
  'Neymar Jr',
  'Luka Modrić',
  'Sergio Ramos',
  'Manuel Neuer',
  'Thiago Silva',
  'Harry Kane',
  'Sadio Mané',
  'Raheem Sterling',
  'Antoine Griezmann',
  'Eden Hazard',
  'Paul Pogba'
]

function App() {
  const [numPlayers, setNumPlayers] = useState(3)
  const [numImposters, setNumImposters] = useState(1);
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [showRole, setShowRole] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const handleStartGame = () => {
    // Select one random player to be the imposter
    const shuffled = [...FOOTBALL_PLAYERS].sort(() => 0.5 - Math.random())
    const imposterPlayer = shuffled[0]
    
    // Select a different random player for all non-imposters (must be different from imposter)
    const regularPlayer = shuffled.find(player => player !== imposterPlayer) || shuffled[1]
    
    // Randomly assign which position will be the imposter
    const imposterIndex = Math.floor(Math.random() * numPlayers)
    
    // Create game players: one imposter, all others have the same regular player name
    const gamePlayers = Array.from({ length: numPlayers }, (_, index) => ({
      name: index === imposterIndex ? imposterPlayer : regularPlayer,
      role: index === imposterIndex ? 'Imposter' : 'Player'
    }))
    
    setPlayers(gamePlayers)
    setGameStarted(true)
    setCurrentPlayerIndex(0)
    setShowRole(false)
  }

  const handleRevealRole = () => {
    setShowRole(true)
  }

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
      setShowRole(false)
    } else {
      // Game finished
      setGameStarted(false)
      setCurrentPlayerIndex(0)
      setShowRole(false)
      setPlayers([])
    }
  }

  const handleReset = () => {
    setGameStarted(false)
    setCurrentPlayerIndex(0)
    setShowRole(false)
    setPlayers([])
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <button 
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <div className="container">
        <h1 className="title">⚽ Imposter Game: Football Edition</h1>
        
        {!gameStarted ? (
          <div className="setup-section">
            <div className="input-group">
              <label htmlFor="numPlayers">Number of Players (3-10):</label>
              <input
                id="numPlayers"
                type="number"
                min="3"
                max="10"
                value={numPlayers}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  if (value >= 3 && value <= 10) {
                    setNumPlayers(value)
                  }
                }}
                className="number-input"
              />
              <label htmlFor="numImposters">Number of Imposters (1-3):</label>
              <input
                id="numImposters"
                type="number"
                min="1"
                max="3"
                value={numImposters}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  if (value >= 1 && value <= 3) {
                    setNumImposters(value)
                  }
                }}
                className="number-input"
              />
            </div>
            <p className="info-text">
              {numPlayers} players will be selected: {numImposters} Imposter and {numPlayers - 1} Players
            </p>
            <button onClick={handleStartGame} className="start-button">
              Start Game
            </button>
          </div>
        ) : (
          <div className="game-section">
            <div className="player-info">
              <p className="player-number">
                Player {currentPlayerIndex + 1} of {players.length}
              </p>
            </div>

            {!showRole ? (
              <div className="reveal-section">
                <p className="instruction">Click the button to reveal your role</p>
                <button onClick={handleRevealRole} className="reveal-button">
                  Reveal Role
                </button>
              </div>
            ) : (
              <div className="role-section">
                <div className={`role-card ${players[currentPlayerIndex]?.role.toLowerCase()}`}>
                  <h3 className="role-title">Your Role:</h3>
                  <p className="role-text">
                    {players[currentPlayerIndex]?.role === 'Imposter' ? '🕵️ IMPOSTER' : '⚽ PLAYER'}
                  </p>
                  {players[currentPlayerIndex]?.role === 'Imposter' ? (
                    <p className="role-description">
                      Your player is  <b>{players[currentPlayerIndex]?.name}</b><br></br>
                      You are the imposter! Try to blend in and avoid being caught.
                    </p>
                  ) : (
                    <p className="role-description">
                      Your player is  <b>{players[currentPlayerIndex]?.name}</b><br></br>
                      You are a regular player. Find the imposter!
                    </p>
                  )}
                </div>
                <button onClick={handleNextPlayer} className="next-button">
                  {currentPlayerIndex < players.length - 1 ? 'Next Player' : 'Finish Game'}
                </button>
              </div>
            )}

            <button onClick={handleReset} className="reset-button">
              Reset Game
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
