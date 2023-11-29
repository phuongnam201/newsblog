import AsyncSelect from "react-select/async";

const MultiSelectTagDropdown = ({
  defaultValue = [],
  loadOptions,
  onChange,
}) => {
  return (
    <div className="relative z-20">
      <AsyncSelect
        defaultValue={defaultValue}
        defaultOptions
        isMulti
        loadOptions={loadOptions}
        onChange={onChange}
      />
    </div>
  );
};

export default MultiSelectTagDropdown;
