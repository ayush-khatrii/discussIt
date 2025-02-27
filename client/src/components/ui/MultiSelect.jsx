import React from 'react'

const users = [
  { label: "Name", value: "name" },
  { label: "Name", value: "name" },
  { label: "Name", value: "name" },
  { label: "Name", value: "name" },
  { label: "Name", value: "name" }
]
const MultiSelect = () => {
  return (
    <div>
      <select>
        {
          users.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))
        }
      </select>
    </div >
  )
}

export default MultiSelect