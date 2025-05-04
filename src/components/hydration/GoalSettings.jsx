import { useState } from 'react'
import { useHydration } from '../../context/HydrationContext'
import { FiSettings, FiInfo } from 'react-icons/fi'

const GoalSettings = () => {
  const { dailyGoal, updateDailyGoal } = useHydration()
  const [newGoal, setNewGoal] = useState(dailyGoal)
  const [showInfo, setShowInfo] = useState(false)

  const predefinedGoals = [
    { label: 'Low Activity (1.5L)', value: 1500 },
    { label: 'Moderate Activity (2L)', value: 2000 },
    { label: 'High Activity (2.5L)', value: 2500 },
    { label: 'Athletic (3L)', value: 3000 },
  ]

  const handleGoalChange = (e) => {
    setNewGoal(parseInt(e.target.value))
  }

  const handleUpdateGoal = () => {
    if (newGoal >= 500 && newGoal <= 5000) {
      updateDailyGoal(newGoal)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Daily Goal Settings</h2>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-500 hover:text-primary-600"
          aria-label="Show information about water intake goals"
        >
          <FiInfo className="h-5 w-5" />
        </button>
      </div>

      {showInfo && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-gray-700">
          <p className="mb-2"><strong>How much water should you drink?</strong></p>
          <p className="mb-2">
            The general recommendation is to drink about 2 liters (8 glasses) of water per day,
            but individual needs vary based on:
          </p>
          <ul className="list-disc pl-5 mb-2 space-y-1">
            <li>Physical activity level</li>
            <li>Climate and environment</li>
            <li>Body weight</li>
            <li>Overall health</li>
          </ul>
          <p>
            Adjust your goal to match your personal needs and consult a healthcare professional
            for personalized advice.
          </p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Current Daily Water Goal
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={newGoal}
            onChange={handleGoalChange}
            min="500"
            max="5000"
            step="50"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <span className="ml-2 text-gray-600">ml</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Select Goal
        </label>
        <div className="grid grid-cols-2 gap-3">
          {predefinedGoals.map((goal, index) => (
            <button
              key={index}
              onClick={() => setNewGoal(goal.value)}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                newGoal === goal.value
                  ? 'bg-primary-100 text-primary-800 border border-primary-200'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adjust Goal Manually
        </label>
        <input
          type="range"
          min="500"
          max="5000"
          step="50"
          value={newGoal}
          onChange={handleGoalChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>500ml</span>
          <span>2000ml</span>
          <span>5000ml</span>
        </div>
      </div>

      <button
        onClick={handleUpdateGoal}
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FiSettings className="mr-2 h-4 w-4" />
        Update Goal
      </button>
    </div>
  )
}

export default GoalSettings