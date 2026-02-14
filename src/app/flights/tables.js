import Link from 'next/link'
import getAirlinePurchaseLink from './links'

export default function PredictionResultTable({ results, recommendation, startAirport, endAirport }) {
  if (!results || results.length === 0) return null

  const firstResult = results[0]
  const colNames = Object.keys(firstResult)
  const priceColIdx = colNames.map(x => x.toLowerCase()).indexOf('price')
  const dateColIdx = colNames.map(x => x.toLowerCase()).indexOf('date')
  const requestIdColIdx = colNames.map(x => x.toLowerCase()).indexOf('requestid')

  return (
    <div className="relative overflow-x-auto bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {colNames.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-6 py-3 font-medium text-gray-900 dark:text-gray-100 ${
                  requestIdColIdx === idx ? 'w-6' : ''
                }`}
              >
                {requestIdColIdx === idx ? '' : col}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((pred, trIdx) => {
            const trValues = Object.values(pred)
            const isRecommended = pred.requestID === recommendation?.requestID

            return (
              <tr
                key={trIdx}
                className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  isRecommended ? 'bg-blue-100 dark:bg-blue-600 font-semibold' : trIdx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                {trValues.map((trCol, tcolIdx) => {
                  if (tcolIdx === requestIdColIdx) {
                    return (
                      <td key={`${trIdx}-${tcolIdx}`} className="px-6 py-4">
                        {isRecommended ? '→' : ''}
                      </td>
                    )
                  }

                  let renderedCol = trCol

                  if (dateColIdx === tcolIdx) {
                    renderedCol = new Date(trCol).toLocaleDateString()
                  }

                  if (priceColIdx === tcolIdx) {
                    renderedCol = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(trCol)
                  }

                  if (trCol === 1) renderedCol = 'Yes'
                  if (trCol === 0) renderedCol = 'No'

                  return (
                    <td key={`${trIdx}-${tcolIdx}`} className="px-6 py-4">
                      {renderedCol}
                    </td>
                  )
                })}

                <td className="px-6 py-4">
                  {getAirlinePurchaseLink({ airline: pred.airline, date: new Date(pred.date), from: startAirport, to: endAirport }) && (
                    <Link
                      href={getAirlinePurchaseLink({ airline: pred.airline, date: new Date(pred.date), from: startAirport, to: endAirport })}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      Purchase
                    </Link>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
