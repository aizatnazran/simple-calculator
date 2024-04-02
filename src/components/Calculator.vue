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
      <button class="ac" @click="clear" style="grid-column: span 2">C</button>
      <button class="ans-button" @click="useAns" style="grid-column: span 2">
        Ans
      </button>

      <!-- Number and operations buttons -->
      <button @click="appendNumber(7)">7</button>
      <button @click="appendNumber(8)">8</button>
      <button @click="appendNumber(9)">9</button>
      <button class="operation" @click="appendOperation('*')">&times;</button>
      <button @click="appendNumber(4)">4</button>
      <button @click="appendNumber(5)">5</button>
      <button @click="appendNumber(6)">6</button>
      <button class="operation" @click="appendOperation('+')">+</button>
      <button @click="appendNumber(1)">1</button>
      <button @click="appendNumber(2)">2</button>
      <button @click="appendNumber(3)">3</button>
      <button class="operation" @click="appendOperation('-')">-</button>
      <button @click="appendNumber(0)" style="grid-column: span 2">0</button>
      <button @click="appendDecimal">.</button>
      <button class="operation" @click="calculate">=</button>
    </div>
    <div class="ans">Ans: {{ lastAnswer }}</div>
  </div>
</template>

<style>
.calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

input[type="text"] {
  width: 100%;
  padding: 30px; /* Increased padding for a taller input area */
  margin: 0;
  box-sizing: border-box;
  border: 0.03rem solid #ccc;
  border-bottom: 1px solid black; /* Maintain the black bottom border */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: right;
  background-color: black;
  color: white;
  font-size: 24px; /* Increased font size for larger numbers */
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

button {
  padding: 20px;
  font-size: 20px;
  border: 0.03rem solid black;
  box-sizing: border-box;
  background-color: #333333;
  color: white;
  outline: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3d3d3d; /* Slightly lighter gray for hover on number buttons */
}

button.operation:hover {
  background-color: #ff9c40; /* Slightly lighter orange for hover on operation buttons */
}

button.ac:hover,
button.ans-button:hover {
  background-color: #dcdcdc; /* Slightly lighter gray for hover on AC and Ans buttons */
}

button.operation {
  background-color: #ff8c00;
}

button.ac,
button.ans-button {
  background-color: #d3d3d3;
  color: black;
}

.ans {
  padding: 10px;
  background-color: #e6e6e6;
  text-align: center;
  margin: 0;
  border: 0.03rem solid black;
  border-radius: 4px;
  box-shadow: none;
  font-weight: bold;
  color: #333;
}
</style>
