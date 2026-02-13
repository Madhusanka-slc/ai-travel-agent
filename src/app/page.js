"use client"; // make for frontend only
import useSWR from 'swr'
import FlightListPage from '@/app/flights/page'
import FlightPredictForm from '@/app/flights/forms'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  return <div>
    <FlightPredictForm />
    </div>
}
