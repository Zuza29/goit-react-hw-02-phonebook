import { Component } from 'react';
import css from '../Input/Input.module.css';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    const { value, onChange, filteredContacts } = this.props;

    return (
      <div className={css.filter}>
        <label htmlFor="filter">
          Filter contacts by name
          <input
            className={css.input}
            type="search"
            value={value}
            onChange={onChange}
            id="filter"
          />
        </label>
        <ul>{filteredContacts}</ul>
      </div>
    );
  }
}

Filter.propTypes = {
  onChange: PropTypes.func,
  filteredContacts: PropTypes.array,
  value: PropTypes.string,
};
