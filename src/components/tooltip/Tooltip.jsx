import React from 'react';
import styles from './Tooltip.module.scss';
import classNames from 'classnames';

const Tooltip = ({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  color = '',
  bgColor = 0,
  // tooltip의 화살표 방향을 '위쪽'으로
  orientation = 'top',
  message,
  ...restProps
}) => {
  // top:top, right:right..의 축약표현
  const style = {
    top,
    right,
    bottom,
    left,
    color,
    backgroundColor: bgColor,
  };

  const setOrientationClass = (type) => {
    switch (type) {
      case 'top':
        return styles.orientationTop;
      case 'right':
        return styles.orientationRight;
      case 'bottom':
        return styles.orientationBottom;
      case 'left':
        return styles.orientationLeft;
      default:
        break;
    }
  };

  return (
    <span
      role='tooltip'
      style={style}
      className={classNames(styles.tooltip, setOrientationClass(orientation))}
      {...restProps}
    >
      {message}
    </span>
  );
};

export default Tooltip;
