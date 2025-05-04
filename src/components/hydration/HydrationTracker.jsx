import { useState } from 'react'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useHydration } from '../../context/HydrationContext'

const HydrationTracker = () => {
  const { 
    dailyGoal, 
    waterIntake, 
    logWaterIntake, 
    getProgressPercentage 
  } = useHydration()
  
  const [customAmount, setCustomAmount] = useState('')
  const progressPercentage = getProgressPercentage()

  const predefinedAmounts = [
    { label: 'Small Glass', amount: 200 },
    { label: 'Medium Glass', amount: 300 },
    { label: 'Large Glass', amount: 400 },
    { label: 'Bottle', amount: 500 },
  ]

  const handleAddWater = (amount) => {
    logWaterIntake(amount)
  }

  const handleCustomAmountSubmit = (e) => {
    e.preventDefault()
    const amount = parseInt(customAmount)
    if (!isNaN(amount) && amount > 0) {
      logWaterIntake(amount)
      setCustomAmount('')
    }
  }

  const waveVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Water Intake Tracker</h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Water Visualization */}
        <div className="w-full md:w-1/3">
          <div className="mx-auto w-48 h-48 relative">
            <div className="w-full h-full rounded-full border-4 border-primary-200 bg-blue-50 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-primary-400"
                style={{ height: `${progressPercentage}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-4 bg-primary-300 opacity-70"
                  variants={waveVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <p className="text-2xl font-bold text-primary-700">{progressPercentage}%</p>
                  <p className="text-sm text-gray-600">{waterIntake}ml / {dailyGoal}ml</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add Panel */}
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Quick Add</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {predefinedAmounts.map((item, index) => (
              <button
                key={index}
                onClick={() => handleAddWater(item.amount)}
                className="flex items-center justify-center p-3 rounded-lg border border-primary-200 bg-primary-50 hover:bg-primary-100 transition-colors"
              >
                <FiPlusCircle className="w-5 h-5 text-primary-600 mr-2" />
                <span className="font-medium">{item.label} ({item.amount}ml)</span>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Custom Amount</h3>
            <form onSubmit={handleCustomAmountSubmit} className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount in ml"
                  className="w-full py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">ml</span>
              </div>
              <button
                type="submit"
                className="ml-2 py-2 px-4 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Daily Progress Status */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Daily Progress</h3>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-600"
            style={{ width: `${progressPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-gray-600">0%</span>
          <span className="text-gray-600">50%</span>
          <span className="text-gray-600">100%</span>
        </div>
        <p className="mt-4 text-center text-gray-700">
          {progressPercentage < 25 && "Getting started! Keep drinking water."}
          {progressPercentage >= 25 && progressPercentage < 50 && "Good progress! Keep it up."}
          {progressPercentage >= 50 && progressPercentage < 75 && "Halfway there! You're doing great."}
          {progressPercentage >= 75 && progressPercentage < 100 && "Almost there! Just a bit more to go."}
          {progressPercentage >= 100 && "Goal achieved! Excellent job staying hydrated today!"}
        </p>
      </div>
    </div>
  )
}

export default HydrationTracker