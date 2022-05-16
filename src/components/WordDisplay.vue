<template>
  <div id="word-container">
    <div v-for="(char, index) in characters" :key="index">
      <div
        class="letter-box cursor-pointer"
        :class="index == charSelected ? `selected` : ``"
        @click="selectIndex(index)"
      >
        {{ char }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WordDisplay",
  data() {
    return {
      characters: ["a", "b", "c", "d", "e"],
      charSelected: 0,
    };
  },
  beforeMount() {
    window.addEventListener("keypress", this.listemKeyPress);
  },
  beforeDestroy() {
    window.removeEventListener("keypress", this.listemKeyPress);
  },
  computed: {
    ...mapGetters(["getDailyWord"]),

    getWord() {
      return this.getDailyWord;
    },
  },
  methods: {
    selectIndex(charIndex) {
      this.charSelected = charIndex;
    },
    validateKeyPressed(char) {
      const regex = RegExp(/^[A-Z]+$/, "i");
      return regex.test(char);
    },
    checkAnswer() {
      if (this.characters.join("") === this.getDailyWord) {
        alert("acertou!");
      } else alert("errou!");

      console.log(this.characters.join(""), this.getDailyWord);
    },
    listemKeyPress(event) {
      const char = String.fromCharCode(event.keyCode);
      if (this.validateKeyPressed(char)) {
        this.characters[this.charSelected] = char;
        this.characters = [...this.characters];
        this.charSelected < 4 ? this.charSelected++ : (this.charSelected = 0);
      }

      if (event.keyCode === 13) this.checkAnswer();
    },
  },
};
</script>

<style scoped lang="scss">
#word-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  .letter-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 2px solid black;
    border-radius: 5px;
    font-size: 1.6rem;
    text-transform: uppercase;
  }
  .selected {
    text-decoration: underline;
  }
}
</style>
