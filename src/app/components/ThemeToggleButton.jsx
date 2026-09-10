import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { getLocale } from '../../config/locale';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const { common } = getLocale();

  return (
    <div className="form-check form-switch mt-2 d-flex justify-content-center">
      <label className="nav-item mx-3" htmlFor="theme-switch">
        {theme === 'light' ? <FontAwesomeIcon icon={faSun} className="text-light" /> : <FontAwesomeIcon icon={faMoon} />}
        <input className="form-check-input" type="checkbox" role="switch" title={common.switchTheme} id="theme-switch" onChange={toggleTheme} />
      </label>
    </div>
  );
}

export default ThemeToggleButton;
