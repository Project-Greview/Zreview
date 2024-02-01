// MODULE

// PROPS TYPE
type InputProps = {
  id: string;
  name: string;
  value: any;
  onChange: any;
  onBlur: any;
  type: string;
  maxLength: number;
  placeholder: string;
  readonly: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  type,
  maxLength,
  placeholder,
  readonly,
}) => {
  return (
    <>
      {name !== "" ? <div className="input_name">{name}</div> : ""}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`input_default`}
        maxLength={maxLength}
        placeholder={placeholder}
        readOnly={readonly}
      />
      <label htmlFor={id}></label>
    </>
  );
};

export default Input;
