import './TextInput.css'

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

function TextInput({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  required = false,
}: TextInputProps) {
  return (
    <div className="text-input">
      {label && (
        <label className="text-input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
)
}

export default TextInput;
