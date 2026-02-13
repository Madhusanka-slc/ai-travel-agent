import Link from '@/app/utils/link'

export default function NotFound() {
  return (
    <div>
      <h2>Flight Not Found</h2>
      <p>The flight you are looking for does not exist.</p>
      <Link href="/flights">Back to Flight List</Link>
    </div>
  )
}