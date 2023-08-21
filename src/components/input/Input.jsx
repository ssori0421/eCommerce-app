import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './Input.module.scss';
import Icon from '../icon/Icon';

const Input = ({
  id,
  label,
  name = '',
  labelVisible,
  icon,
  email,
  password,
  placeholder = '',
  readOnly,
  disabled,
  value,
  error: errorProp,
  className = '',
  onChange,
  ...restprops
}) => {
  const [inputValue, setInputValue] = useState(value ? value : '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // input의 type을 지정하는 함수 선언
  const checkType = () => {
    if (email) {
      return 'email';
    }
    if (password) {
      return isPasswordVisible ? 'text' : 'password';
    }
    return 'text';
  };

  // inputValue, email or password 두 개의 state를 업데이드하는 함수 선언
  // prop으로 받은 onChange 함수임
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  // password input 오른쪽 눈 모양 아이콘(비밀번호 보임/숨김)
  const iconType = isPasswordVisible ? 'show' : 'hide';
  const iconLabel = `비밀번호 ${isPasswordVisible ? '표시' : '감춤'}`;

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>

      {/* errorProp이 있는 경우 inputWrapperError styling을 따름 */}
      <div
        className={classNames(
          styles.inputWrapper,
          errorProp && styles.inputWrapperError
        )}
      >
        {icon ? <Icon type={icon} /> : null}
        <input
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restprops}
        />

        {/* password input의 경우 눈 모양 아이콘이 추가로 있음 */}
        {password ? (
          <button
            type='button'
            className={styles.button}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
      </div>

      {/* error가 있을 경우 */}
      {errorProp && (
        <span role='alert' className={styles.error}>
          {errorProp.massage}
        </span>
      )}
    </div>
  );
};

export default Input;
