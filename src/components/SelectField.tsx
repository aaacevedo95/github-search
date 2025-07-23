import { useQueryState } from 'nuqs';

type SelectFieldProps = {
  name: string;
  options: string[];
  parseType: any;
};

function SelectField({ name, options, parseType }: SelectFieldProps) {
  const [value, setValue] = useQueryState(name, parseType);

  return (
    <select
      style={{ width: 100, height: 36, borderWidth: 1, borderRadius: 4 }}
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default SelectField;
