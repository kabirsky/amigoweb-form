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

  const getErrorMsg = (text) => {
    return <div className="error-msg">{text}</div>;
  };

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
    setFormState({ ...formState, agreement: !agreement });
  };

  const handleKeyPress = (event) => {
    event.key === "Enter" && handleSubmit(event);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrorFormState = { ...errorFormState };
    isError = false;

    //Проверка ФИО
    if (name === "" || name.match(/^[a-z а-яё -]+$/i) === null) {
      isError = true;
      newErrorFormState.isNameError = true;
    } else {
      if (isNameError) newErrorFormState.isNameError = false;
    }

    //Проверка емейла
    //В случае с проверкой емейла - проще всего проверять на наличие @ и всё
    if (email === "" || email.match(/[^@]+@[^@]+/i) === null) {
      isError = true;
      newErrorFormState.isEmailError = true;
    } else {
      if (isEmailError) newErrorFormState.isEmailError = false;
    }

    //Проверка телефона
    if (phone === "" || phone.includes("_")) {
      isError = true;
      newErrorFormState.isPhoneError = true;
    } else {
      if (isPhoneError) newErrorFormState.isPhoneError = false;
    }

    //Проверка языка
    if (language.value === "" || language === "") {
      isError = true;
      newErrorFormState.isLanguageError = true;
    } else {
      if (isLanguageError) newErrorFormState.isLanguageError = false;
    }

    setErrorFormState(newErrorFormState);

    if (!isError) {
      setTimeout(() => alert("Успех"), 0); //Чтобы интерфейс успел обновиться
    }
  };

  return (
    <div className="app">
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
            {isNameError ? getErrorMsg("Введено не корректное значение") : ""}
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
            {isEmailError ? getErrorMsg("Введено не корректное значение") : ""}
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
            {isPhoneError ? getErrorMsg("Введено не корректное значение") : ""}
          </label>

          <label className="language-label label" name="language">
            Язык
            <Select
              className="select-container"
              classNamePrefix="select"
              options={selectOptions}
              placeholder={"Язык"}
              onKeyPress={handleKeyPress}
              value={language}
              onChange={handleChangeLanguage}
            />
            {isLanguageError ? getErrorMsg("Выберите язык") : ""}
          </label>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              className="agreement-checkbox checkbox"
              name="agreement"
              id="agreement-checkbox"
              onKeyPress={handleKeyPress}
              checked={agreement}
              onChange={handleChangeAgreement}
            />
            <label
              htmlFor="agreement-checkbox"
              className="agreement-label label"
            >
              {"Принимаю "}
              <a href="#" className="agreement-link link">
                условия
              </a>
              {" использования"}
            </label>
          </div>

          <button
            className={
              agreement
                ? "register-btn btn"
                : "register-btn register-btn--disabled btn"
            }
            onKeyPress={handleKeyPress}
            disabled={!agreement}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
