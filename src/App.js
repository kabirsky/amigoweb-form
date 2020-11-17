/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Select from "react-select";
import MaskedInput from "react-text-mask";
import "./App.scss";

function App() {
  let isError = false;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    language: "",
    agreement: false,
  });
  const { name, email, phone, language, agreement } = formState;

  const [errorFormState, setErrorFormState] = useState({
    isNameError: false,
    isEmailError: false,
    isPhoneError: false,
    isLanguageError: false,
  });
  const {
    isNameError,
    isEmailError,
    isPhoneError,
    isLanguageError,
  } = errorFormState;

  const mask = [
    "+",
    "7",
    "(",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ")",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
  ];
  const selectOptions = [
    { value: "russian", label: "Русский" },
    { value: "english", label: "Английский" },
    { value: "mandarin", label: "Китайский" },
    { value: "spanish", label: "Испанский" },
  ];

  const handleChangeName = (event) => {
    setFormState({ ...formState, name: event.target.value });
  };
  const handleChangePhone = (event) => {
    setFormState({ ...formState, phone: event.target.value });
  };
  const handleChangeEmail = (event) => {
    setFormState({ ...formState, email: event.target.value });
  };
  const handleChangeLanguage = (event) => {
    console.log(event);
    setFormState({
      ...formState,
      language: event ? { value: event.value, label: event.label } : "",
    });
  };
  const handleChangeAgreement = (event) => {
    setFormState({ ...formState, agreement: event.target.value });
  };

  const handleKeyPress = (event) => {
    event.key === "Enter" && handleSubmit(event);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    isError = false;
    //Проверка ФИО
    if (name === "" || name.match(/^[a-z а-яё ,.'-]+$/i) === null) {
      isError = true;
      alert(123);
      //setErrorName("form-element form-name form-element__error");
    } else {
      //setErrorName("form-element form-name");
    }

    //Проверка емейла
    if (email === "" || email.match(/[^@]+@[^.]+\..+/i) === null) {
      isError = true;
      //setErrorEmail("form-element form-email form-element__error");
    } else {
      //setErrorEmail("form-element form-email");
    }

    //Проверка телефона
    if (phone === "" || phone.includes("_")) {
      isError = true;
      //setErrorPhone("form-element form-phone form-element__error");
    } else {
      //setErrorPhone("form-element form-phone");
    }
  };

  return (
    <div className="App">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="registration-title">Регистрация</h2>
          <h3 className="login-title">
            Уже есть аккаунт?{" "}
            <a href="#" className="login-link link">
              Войти
            </a>
          </h3>

          <label className="name-label label" name="name">
            Имя
            <input
              className="name-input input"
              type="text"
              placeholder="Введите ваше имя"
              value={name}
              onChange={handleChangeName}
            />
          </label>

          <label className="email-label label" name="email">
            Email
            <input
              className="email-input input"
              type="text"
              placeholder="Введите ваш email"
              onKeyPress={handleKeyPress}
              value={email}
              onChange={handleChangeEmail}
            />
          </label>

          <label className="phone-label label" name="phone">
            Телефон
            <MaskedInput
              className="phone-input input"
              type="text"
              name="phone"
              mask={mask}
              placeholder="+7(999)123-45-78"
              onKeyPress={handleKeyPress}
              value={phone}
              onChange={handleChangePhone}
            />
          </label>

          <label className="language-label label" name="language">
            Язык
            <Select
              className="select-container"
              classNamePrefix="select"
              options={selectOptions}
              placeholder={"Язык"}
              onKeyPress={handleKeyPress}
              value={selectOptions.find((item) => item.value === language)}
              onChange={handleChangeLanguage}
            />
          </label>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              className="agreement-checkbox checkbox"
              name="agreement"
              id="agreement-checkbox"
              onKeyPress={handleKeyPress}
              value={agreement}
              onChange={handleChangeAgreement}
            />
            <label for="agreement-checkbox" className="agreement-label label">
              Принимаю&nbsp;
              <a href="#" className="agreement-link link">
                условия
              </a>
              &nbsp;использования
            </label>
          </div>

          <button className="register-btn btn" onKeyPress={handleKeyPress}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
