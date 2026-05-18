'use client'
import { useState } from 'react'

export default function SearchInput() {
  const [value, setValue] = useState('')

  return (
    <div>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        placeholder="Type something..."
      />
      <p>Current input: {value}</p>
    </div>
  )
}