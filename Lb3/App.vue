<template>
  <div class="app">
    <h1>Форма регистрации</h1>

    <div class="form-group">
      <label for="name">Имя:</label>
      <input
        id="name"
        type="text"
        :value="name"
        @input="name = $event.target.value"
        placeholder="Введите имя"
      />
    </div>

    <div class="form-group">
      <label for="surname">Фамилия:</label>
      <input
        id="surname"
        type="text"
        :value="surname"
        @input="surname = $event.target.value"
        placeholder="Введите фамилию"
      />
    </div>

    <div class="form-group">
      <label>Пол:</label>
      <div class="radio-group">
        <label class="radio-label">
          <input
            type="radio"
            value="male"
            :checked="gender === 'male'"
            @change="gender = 'male'"
          />
          Мужской
        </label>
        <label class="radio-label">
          <input
            type="radio"
            value="female"
            :checked="gender === 'female'"
            @change="gender = 'female'"
          />
          Женский
        </label>
      </div>
    </div>

    <div class="form-group">
      <label for="password">Пароль:</label>
      <input
        id="password"
        :type="showPassword ? 'text' : 'password'"
        :value="password"
        @input="password = $event.target.value"
        placeholder="Введите пароль"
      />
      <button
        type="button"
        class="show-pass-btn"
        @mousedown="showPassword = true"
        @mouseup="showPassword = false"
        @mouseleave="showPassword = false"
      >
        Показать пароль
      </button>
    </div>

    <div class="form-group">
      <label for="confirmPassword">Подтвердите пароль:</label>
      <input
        id="confirmPassword"
        :type="showPassword ? 'text' : 'password'"
        :value="confirmPassword"
        @input="confirmPassword = $event.target.value"
        placeholder="Повторите пароль"
      />
    </div>

    <div class="user-info">
      <p>
        Пользователь: {{ name }} {{ surname }}.
        {{ gender === 'male' ? 'Мужского пола' : 'Женского пола' }}
      </p>
    </div>

    <button
      class="register-btn"
      :disabled="password !== confirmPassword"
      @click="console.log(name, surname, gender, password)"
    >
      Зарегистрироваться
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const surname = ref('');
const gender = ref('male');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.app {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 255, 255, 0.2);
  max-width: 500px;
  width: 100%;
  border: 2px solid #00d4d4;
}

h1 {
  text-align: center;
  color: #000000;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 3px solid #00d4d4;
  padding-bottom: 15px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group > label:first-child {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #000000;
  font-size: 14px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #000000;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #ffffff;
  color: #000000;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #00d4d4;
  box-shadow: 0 0 0 3px rgba(0, 212, 212, 0.1);
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: #666666;
}

.radio-group {
  margin-top: 8px;
}

.radio-label {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
  font-weight: normal;
  cursor: pointer;
  color: #000000;
}

input[type="radio"] {
  margin-right: 8px;
  accent-color: #00d4d4;
  cursor: pointer;
}

.show-pass-btn {
  background: #00d4d4;
  color: #000000;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 8px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.show-pass-btn:hover {
  background: #00a8a8;
}

.user-info {
  background-color: #000000;
  color: #00d4d4;
  padding: 15px;
  border-radius: 6px;
  margin: 25px 0;
  border-left: 4px solid #00d4d4;
}

.user-info p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.register-btn {
  width: 100%;
  padding: 14px 20px;
  background-color: #00d4d4;
  color: #000000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.register-btn:hover:not(:disabled) {
  background-color: #00a8a8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 212, 0.4);
}

.register-btn:active:not(:disabled) {
  transform: translateY(0);
}

.register-btn:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>