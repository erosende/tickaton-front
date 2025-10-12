import './NumericInput.css'

interface NumericInputProps {
  value: number
  onChange: (value: number) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  min?: number
  max?: number
}

function NumericInput({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  required = false,
  min,
  max,
}: NumericInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (inputValue === '') {
      onChange(0)
      return
    }

    const numericValue = parseFloat(inputValue)

    // Validate and round to 2 decimal places
    if (!isNaN(numericValue)) {
      const roundedValue = Math.round(numericValue * 100) / 100
      onChange(roundedValue)
    }
  }

  return (
    <div className="numeric-input">
      {label && (
        <label className="numeric-input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type="number"
        step="0.01"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
      />
    </div>
  )
}

export default NumericInput
