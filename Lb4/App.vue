<template>
  <div class="expense-tracker">
    <h1>УЧЁТ РАСХОДОВ</h1>
    
    <div class="balance-info">
      <p>Баланс: {{ balance }}</p>
      <p>Расходы: {{ expense }}</p>
      <p>Доходы: {{ income }}</p>
    </div>

    <ul class="history-list">
      <li v-for="item in history" :key="item.id" class="history-item">
        <span>{{ item.text }}</span>
        <span :class="{ positive: item.amount > 0, negative: item.amount < 0 }">
          {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
        </span>
      </li>
      <li v-if="history.length === 0" class="empty-message">
        Вы не совершали финансовых операций
      </li>
    </ul>

    <!-- Форма добавления -->
    <form @submit.prevent="addEntry" class="add-form">
      <input 
        type="text" 
        v-model.trim="title" 
        placeholder="Введите название" 
        class="form-input"
      >
      <input 
        type="number" 
        v-model.number="amount" 
        placeholder="Введите сумму" 
        class="form-input"
      >
      <button type="submit" class="add-btn">Добавить</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const history = ref([]);

const title = ref('');
const amount = ref(null);

let nextId = 1;

const addEntry = () => {
  if (title.value && amount.value) {
    history.value.push({
      id: nextId++,
      text: title.value,
      amount: amount.value
    });
    
    title.value = '';
    amount.value = null;
  }
};

const income = computed(() => {
  return history.value
    .filter(item => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);
});

const expense = computed(() => {
  return Math.abs(
    history.value
      .filter(item => item.amount < 0)
      .reduce((acc, item) => acc + item.amount, 0)
  );
});

const balance = computed(() => {
  return history.value.reduce((acc, item) => acc + item.amount, 0);
});
</script>

<style scoped>
.expense-tracker {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.balance-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.balance-info p {
  margin: 5px 0;
  font-size: 16px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.positive {
  color: #4CAF50;
  font-weight: bold;
}

.negative {
  color: #f44336;
  font-weight: bold;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 20px;
  font-style: italic;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.add-btn:hover {
  background-color: #45a049;
}
</style>