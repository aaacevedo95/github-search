import { useQueryState, type ParserBuilder } from 'nuqs';

import './SelectField.css';

type SelectFieldProps = {
  name: string;
  options: { label: string; value: string }[];
  // Type for nuqs parse
  parseType: Omit<ParserBuilder<string>, 'parseServerSide'> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
};

function SelectField({ name, options, parseType }: SelectFieldProps) {
  const [value, setValue] = useQueryState(name, parseType);

  return (
    <div className="select-field-container">
      <select
        className="select-input"
        id={name}
        style={{ width: '100%', height: 36, borderWidth: 1, borderRadius: 3 }}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
