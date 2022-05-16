<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <WordDisplay />
  </div>
</template>

<script>
// @ is an alias to /src
import WordDisplay from "@/components/WordDisplay";

export default {
  name: "HomeView",
  components: {
    WordDisplay,
  },
};
</script>

<style scoped lang="scss">
.home {
  margin: 0 15%;
  @media screen and(max-width: 769px) {
    margin: 0;
  }
}
</style>
