<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentInput: "",
    };
  },
  methods: {
    ...mapMutations(["setLastAnswer"]),
    appendNumber(number) {
      this.currentInput += number;
    },
    appendOperation(operation) {
      this.currentInput += ` ${operation} `;
    },
    appendDecimal() {
      if (!this.currentInput.includes(".")) {
        this.appendNumber(".");
      }
    },
    clear() {
      this.currentInput = "";
    },
    useAns() {
      this.appendNumber(this.lastAnswer);
    },
    calculate() {
      try {
        const result = eval(this.currentInput);
        this.setLastAnswer(result);
        this.currentInput = result.toString();
      } catch (e) {
        console.error(e);
        this.currentInput = "Error";
      }
    },
  },
  computed: {
    ...mapState(["lastAnswer"]),
  },
};
</script>


<template>
  <div class="calculator">
    <input type="text" v-model="currentInput" disabled />
    <div class="buttons">
      <!-- Top row with clear and Ans buttons -->
      <button @click="clear" style="grid-column: span 2">C</button>
      <button @click="useAns" style="grid-column: span 2">Ans</button>

      <!-- Number and operations buttons -->
      <button @click="appendNumber(7)">7</button>
      <button @click="appendNumber(8)">8</button>
      <button @click="appendNumber(9)">9</button>
      <button @click="appendOperation('*')">&times;</button>
      <button @click="appendNumber(4)">4</button>
      <button @click="appendNumber(5)">5</button>
      <button @click="appendNumber(6)">6</button>
      <button @click="appendOperation('+')">+</button>
      <button @click="appendNumber(1)">1</button>
      <button @click="appendNumber(2)">2</button>
      <button @click="appendNumber(3)">3</button>
      <button @click="appendOperation('-')">-</button>
      <button @click="appendNumber(0)" style="grid-column: span 2">0</button>
      <button @click="appendDecimal">.</button>
      <button @click="calculate">=</button>
    </div>
    <div class="ans">Ans: {{ lastAnswer }}</div>
  </div>
</template>

<style>
.calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

input[type="text"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: right;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.ans {
  grid-column: span 4;
  padding: 10px;
  background-color: #e6e6e6;
  text-align: center;
  margin-top: 20px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: #333;
}
</style>
