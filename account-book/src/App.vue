<template>
  <div id="app">
    <account-book></account-book>
    <todo-list></todo-list>
    <habit></habit>
    <photo-album></photo-album>
  </div>
</template>

<script>
import AccountBook from "./components/AccountBook.vue";
import TodoList from "./components/TodoList.vue";
import Habit from "./components/Habit.vue";
import PhotoAlbum from "./components/PhotoAlbum.vue";

export default {
  name: "app",
  components: {
    AccountBook,
    TodoList,
    Habit,
    PhotoAlbum
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app > div {
  margin-bottom: 10%;
}
</style>
