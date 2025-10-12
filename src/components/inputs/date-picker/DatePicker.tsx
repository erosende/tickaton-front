import './DatePicker.css'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  minDate?: string
  maxDate?: string
}

function DatePicker({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  required = false,
  minDate,
  maxDate,
}: DatePickerProps) {
  return (
    <div className='date-picker'>
      {label && (
        <label className="date-picker-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={minDate}
        max={maxDate}
      />
    </div>
  )
}

export default DatePicker