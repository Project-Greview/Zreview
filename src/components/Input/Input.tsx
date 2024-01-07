// MODULE

// PROPS TYPE
type InputProps = {
  id: string;
  name: string;
  value: any;
  onChange: any;
  type: string;
};

const Input: React.FC<InputProps> = ({ id, name, value, onChange, type }) => {
  console.log(value);
  return (
    <>
      {name !== "" ? <div className="input_name">{name}</div> : ""}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className={`input_default`}
      />
      <label htmlFor={id}></label>
    </>
  );
};

export default Input;
