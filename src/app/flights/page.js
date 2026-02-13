"use client"; // make for frontend only

import Link from "@/app/utils/link";
import useAPIGetRequest from "@/app/utils/apiClient";

export default function FlightListPage() {
  // Use custom hook
  const { data, error, isLoading } = useAPIGetRequest("/flights");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("data:", data);

  const myVar = "world";

  // Render each flight row
  const renderListData = (row, idx) => {
    const flightRowLink = `/flights/${row.id}`;
    return (
      <div key={`flight-date-${idx}`} className="border-b p-2">
        <p>
          <Link href={flightRowLink}>{row.flightDate}</Link>
        </p>
        <p>{row.startingAirport}</p>
        <p>{row.destinationAirport}</p>
        <p>{row.segmentsAirlineName}</p>
        <p>{row.totalFare}</p>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Hello {myVar}</h1>
      {data && data.map(renderListData)}
    </div>
  );
}
