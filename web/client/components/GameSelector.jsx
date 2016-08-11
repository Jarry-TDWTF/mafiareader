import React from "react";

class GameSelector extends React.Component {
  getOptionKeyValue() {
    return this.props.keyValue || 'value';
  }

  getOptionKeyText() {
    return this.props.keyText || 'text';
  }

  render() {
    const {
      label,
      options,
      nullOptionText,
      selectedValue,
      onOptionSelected,
      disabled
    } = this.props;

    const maybeNullOption = nullOptionText ? (<option>{nullOptionText}</option>) : '';
    return (
      <select
        onChange={(e) => {
          const selectedOption = options.find(option =>
            option[this.getOptionKeyValue()].toString() === e.target.value
          );
          onOptionSelected(selectedOption);
        }}
        value={selectedValue}
        disabled={disabled}
      >
        {maybeNullOption}
        {(options || []).map(option => (
          <option
            key={option[this.getOptionKeyValue()]}
            value={option[this.getOptionKeyValue()]}
          >
            {option[this.getOptionKeyText()]}
          </option>
        ))}
      </select>
    );
  }
}

export default GameSelector;