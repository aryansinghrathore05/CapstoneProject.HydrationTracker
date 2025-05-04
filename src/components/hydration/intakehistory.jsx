import { useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { useHydration } from '../../context/HydrationContext'
import { FiDroplet, FiCalendar, FiClock } from 'react-icons/fi'

const IntakeHistory = () => {
  const { intakeHistory, waterIntake, dailyGoal } = useHydration()
  
  // Group entries by date for display
  const groupedEntries = useMemo(() => {
    const grouped = {}
    
    intakeHistory.forEach(entry => {
      const date = format(parseISO(entry.timestamp), 'yyyy-MM-dd')
      
      if (!grouped[date]) {
        grouped[date] = {
          date,
          entries: [],
          totalAmount: 0,
        }
      }
      
      grouped[date].entries.push(entry)
      grouped[date].totalAmount += entry.amount
    })
    
    // Convert to array and sort by date (newest first)
    return Object.values(grouped).sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }, [intakeHistory])
  
  const formatTime = (timestamp) => {
    return format(parseISO(timestamp), 'h:mm a')
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'MMMM d, yyyy')
  }
  
  const calculatePercentage = (amount) => {
    return Math.min(Math.round((amount / dailyGoal) * 100), 100)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Intake History</h2>
      
      {/* Today's Summary */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
        <h3 className="text-lg font-semibold text-primary-800 mb-2">Today's Summary</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">Total Intake: <span className="font-semibold">{waterIntake}ml</span></p>
            <p className="text-gray-700">Goal Progress: <span className="font-semibold">{calculatePercentage(waterIntake)}%</span></p>
          </div>
          <div className="w-16 h-16 relative">
            <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full" style={{
                background: `conic-gradient(#0ea5e9 ${calculatePercentage(waterIntake)}%, transparent 0)`,
                clipPath: 'circle(50% at center)'
              }}></div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center z-10">
                <FiDroplet className="h-6 w-6 text-primary-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* History List */}
      {groupedEntries.length === 0 ? (
        <div className="text-center py-10">
          <FiDroplet className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-gray-500">No intake history yet. Start tracking your water intake!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedEntries.map((group) => (
            <div key={group.date} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex items-center mb-3">
                <FiCalendar className="mr-2 text-primary-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {formatDate(group.date)}
                </h3>
              </div>
              
              <div className="ml-6 space-y-3">
                {group.entries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <FiDroplet className="h-4 w-4 text-primary-500 mr-2" />
                      <span className="font-medium">{entry.amount}ml</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiClock className="h-4 w-4 mr-1" />
                      <span>{formatTime(entry.timestamp)}</span>
                    </div>
                  </div>
                ))}
                
                <div className="mt-2 pt-2 border-t border-dashed border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total for day:</span>
                  <span className="font-semibold text-primary-700">{group.totalAmount}ml</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default IntakeHistory