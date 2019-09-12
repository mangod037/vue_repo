<template>
  <div class="habit-container">
    <h1>습관만들기</h1>
    <br />
    <input type="text" placeholder="습관 추가하기" v-model="newTask" v-on:keyup.enter="addHabit()" />
    <br />
    <table class="task-table">
      <td class="task-table-item">
        날짜
        <tr class="task-table-item" v-for="(n, index) in 7" v-bind:key="index">{{n}}</tr>
      </td>
      <td class="task-table-item" v-for="task in tasks" v-bind:key="task.id">
        {{task.title}}
        <tr v-for="(n, index) in 7" v-bind:key="index">
          <input type="checkbox" v-model="task.completed[index]" />
        </tr>
      </td>
    </table>
    <div v-for="(task, index) in tasks" :key="index">{{task.title}} 성공률: {{successRate(task)}}%</div>
    <br />
  </div>
</template>

<script>
export default {
  name: "habit",
  data: function() {
    return {
      newTask: "",
      taskID: 3,
      tasks: [
        {
          id: 1,
          title: "하루 3km 걷기",
          completed: [false, false, false, false, false, false, false]
        },
        {
          id: 2,
          title: "하루 커피 1잔으로 줄이기",
          completed: [false, false, false, false, false, false, false]
        }
      ]
    };
  },
  methods: {
    addHabit: function() {
      if (this.newTask.trim().length == 0) {
        return;
      }
      this.tasks.push({
        id: this.taskID,
        title: this.newTask,
        completed: [false, false, false, false, false, false, false]
      });
      this.newTask = "";
      this.taskID++;
    },
    // computed는 parameter를 전달 받지 못해서 method로 성공률 계산
    successRate(value) {
      let count = 0;
      value.completed.forEach(function(e) {
        if (e === true) {
          count++;
        }
      });
      return Math.round((count / value.completed.length) * 100);
    }
  }
};
</script>

<style>
* {
  margin: 0 0;
}
.habit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.task-table {
  width: 50%;
  border: 1px lightgrey solid;
}
.task-table-item {
  border: 1px lightgrey solid;
}
</style>