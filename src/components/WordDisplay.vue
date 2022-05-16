<template>
  <div class="word-list">
    <div class="word-container">
      <div v-for="(char, index) in playerChars" :key="index">
        <div
          class="letter-box cursor-pointer"
          :class="index == charSelected ? `selected` : ``"
          @click="selectIndex(index)"
        >
          {{ char }}
        </div>
      </div>
    </div>
    <div
      v-for="(change, chanceIndex) in chances"
      :key="chanceIndex"
      class="word-container"
    >
      <div v-for="(char, charIndex) in chars" :key="charIndex">
        <div
          v-if="wordList[chanceIndex]"
          class="letter-box"
          :class="
            !hasChar(wordList[chanceIndex][charIndex])
              ? `false-char`
              : hasRightPositionChar(
                  wordList[chanceIndex][charIndex],
                  charIndex
                )
              ? `correct-char`
              : `unpositioned-char`
          "
        >
          {{ wordList[chanceIndex][charIndex] }}
        </div>
        <div v-else class="letter-box"></div>
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
      chars: 5,
      chances: 5,
      playerChars: ["a", "b", "c", "d", "e"],
      rightWord: [],
      charSelected: 0,
      wordList: [],
    };
  },
  beforeMount() {
    this.rightWord = this.getDailyWord.split("");
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
      if (this.playerChars.join("") === this.getDailyWord) {
        window.removeEventListener("keypress", this.listemKeyPress);
        alert("acertou!");
      } else {
        this.wordList.push([...this.playerChars]);
        alert("errou!");
      }
    },
    listemKeyPress(event) {
      const char = String.fromCharCode(event.keyCode);
      if (this.validateKeyPressed(char)) {
        this.playerChars[this.charSelected] = char;
        this.playerChars = [...this.playerChars];
        this.charSelected < 4 ? this.charSelected++ : (this.charSelected = 0);
      }

      if (event.keyCode === 13) this.checkAnswer();
    },
    hasChar(char) {
      return this.rightWord.some((rightChar) => rightChar === char);
    },
    hasRightPositionChar(char, charIndex) {
      return this.getAllIndexes(this.rightWord, char).includes(charIndex);
    },
    getAllIndexes(arr, val) {
      let indexes = [];
      for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
      return indexes;
    },
  },
};
</script>

<style scoped lang="scss">
.word-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  .word-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
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
    .false-char {
      background-color: grey;
    }
    .correct-char {
      background-color: green;
    }
    .unpositioned-char {
      background-color: yellow;
    }
    .selected {
      text-decoration: underline;
    }
  }
}
</style>
