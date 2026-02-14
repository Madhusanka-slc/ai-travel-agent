"use client";
import useAPIGetRequest from '@/app/utils/apiClient' // Changed import name

export default function AirportDropdown({name, value, filterval, onChange}) {
  const { data, error, isLoading } = useAPIGetRequest("/airports") // Changed function name
  console.log("DATA:: ",data)
  console.log("FilterVal::",filterval)
  
  if (error) return <select><option>Error</option></select>
  if (isLoading) return <select><option>Loading..</option></select>
  
  const displayData = data.filter(
    x => x.value.toLowerCase() !== filterval?.toLowerCase()
  );

  
  const handleChange = event => {
    if(onChange) {
      onChange(event)
    }
  }
  
  return (
    <select name={name} value={value} onChange={handleChange}>
      {displayData.map((airport, idx) => {
        return (
          <option 
            key={idx} 
            value={airport.value}
          >
            {airport.value} - {airport.label}
          </option>
        )
      })}
    </select>
  )
}

// Problem: You called useSWR inside a regular function (performAPIGetRequest). React only allows hooks inside components or custom hooks (functions starting with use).

// Fix: Rename it to start with use, e.g., useAPIGetRequest. Now React treats it as a custom hook and useSWR works correctly.