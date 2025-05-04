import { useState } from 'react'
import { useHydration } from '../../context/HydrationContext'
import { FiClock, FiTrash2, FiAlertCircle, FiToggleLeft, FiToggleRight } from 'react-icons/fi'

const ReminderSettings = () => {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useHydration()
  const [newReminder, setNewReminder] = useState({
    time: '',
    message: 'Time to drink water!',
  })

  const handleAddReminder = (e) => {
    e.preventDefault()
    
    if (!newReminder.time) return
    
    addReminder(newReminder.time, newReminder.message)
    
    // Reset form
    setNewReminder({
      time: '',
      message: 'Time to drink water!',
    })
  }

  const predefinedMessages = [
    'Time to drink water!',
    'Hydration break!',
    'Don\'t forget your water!',
    'Stay hydrated, stay healthy!',
    'Water time!',
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Hydration Reminders</h2>
      
      {/* Add New Reminder Form */}
      <form onSubmit={handleAddReminder} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiClock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                id="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Message
            </label>
            <select
              id="message"
              value={newReminder.message}
              onChange={(e) => setNewReminder({ ...newReminder, message: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {predefinedMessages.map((message, index) => (
                <option key={index} value={message}>
                  {message}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Add Reminder
        </button>
      </form>
      
      {/* Current Reminders */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Current Reminders</h3>
        
        {reminders.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <FiAlertCircle className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-gray-500">No reminders set. Add your first reminder above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="mr-3 text-primary-600">
                    <FiClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{reminder.time}</p>
                    <p className="text-sm text-gray-600">{reminder.message}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => toggleReminder(reminder.id)}
                    className={`text-lg ${
                      reminder.enabled ? 'text-primary-600' : 'text-gray-400'
                    }`}
                    aria-label={reminder.enabled ? 'Disable reminder' : 'Enable reminder'}
                  >
                    {reminder.enabled ? (
                      <FiToggleRight className="h-6 w-6" />
                    ) : (
                      <FiToggleLeft className="h-6 w-6" />
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete reminder"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {reminders.length > 0 && (
          <p className="mt-4 text-xs text-gray-500 italic">
            * Reminders are simulated for demo purposes. In a production app, these would trigger
            browser or mobile notifications at the specified times.
          </p>
        )}
      </div>
    </div>
  )
}

export default ReminderSettings