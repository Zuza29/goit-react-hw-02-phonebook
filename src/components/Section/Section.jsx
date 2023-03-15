import { Component } from 'react';
import css from '../Section/Section.module.css';
import PropTypes from 'prop-types';

export class Section extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <>
        <h2 className={css.title}>{title}</h2>
        <div className={css.sectionWrapper}>{children}</div>
      </>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string,
};
