import css from './Button.module.css';

export const Button = props => {
  const { name, onClick } = props;

  return (
    <button className={css.button} onClick={onClick}>
      {name}
    </button>
  );
};
