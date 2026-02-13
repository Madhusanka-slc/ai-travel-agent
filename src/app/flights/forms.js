import { API_BASE_URL } from '@/app/utils/apiClient'
import { useState } from 'react'

import AirportDropdown from '@/app/airports/dropdown'
import PredictionResultTable from './tables';


export default function FlightPredictForm(props) {
  const [startAirportVal, setStartAirportVal] = useState("jfk") 
  const [endAirportVal, setEndAirportVal] = useState("lax") 
  const [predictData, setPredictData] = useState({
    loading: false,
    predictions: []
  })

  const btnLabel = predictData.loading ? "Loading.." : "Help me"
  const btnClassName =  predictData.loading ? "btn-disabled" : "btn-primary" 

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!predictData.loading){
      setPredictData(prev => ({ ...prev, loading: true }))
      const formData = new FormData(event.target)
      const formObj = Object.fromEntries(formData.entries())
      formObj.isNonStop = formObj.isNonStop === "true"
      formObj.isBasicEconomy = formObj.isBasicEconomy === "true"
      formObj.isRefundable = formObj.isRefundable === "true"

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObj)
      })
      const data = await response.json()
      console.log(data)

      setPredictData(prev => ({
        ...prev,
        loading: false,
        predictions: data && data.prediction ? data.prediction : []
      }))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <AirportDropdown 
          name='startingAirport' 
          value={startAirportVal}
          onChange={e => setStartAirportVal(e.target.value)} 
        />
        <AirportDropdown 
          name='destinationAirport' 
          value={endAirportVal}
          onChange={e => setEndAirportVal(e.target.value)}
          filterval={startAirportVal} 
        />

        <div>
       <div>
        
         <input type='checkbox' name='isNonStop' id='isNonStop' />
            <label htmlFor='isNonStop'>
                
                Non stop flight?
            </label>
        </div>
          <div>
        <input type='checkbox' name='isBasicEconomy' id='isBasicEconomy'  />
            <label htmlFor='isBasicEconomy'>
                
                Basic Economy?
            </label>
        </div>
          <div>
            <input type='checkbox' name='isRefundable' id='isRefundable' />
            <label htmlFor='isRefundable'>
               
                Refundable?
            </label>
        </div>
        </div>

       <button disabled={predictData.loading} className={btnClassName} type="submit">{btnLabel}</button>
      </form>

      <PredictionResultTable results= {predictData && predictData.predictions} />

    </div>
  )
}
