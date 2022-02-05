import React, { useState, useEffect } from 'react'

export const Input = props => {
  const { onChange, ...otherProps } = props

  const [inputTimeout, setInputTimeout] = useState(null)

  useEffect(() => () => clearTimeout(inputTimeout), [inputTimeout])

  const inputOnChange = value => {
    if (inputTimeout) clearTimeout(inputTimeout)
    setInputTimeout(
      setTimeout(() => {
        if (onChange) onChange(value)
      }, 1000)
    )
  }

  return (
    <input className='input'
      {...otherProps}
      onChange={e => inputOnChange(e.target.value)}
    />
  )
}