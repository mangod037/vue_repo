<template>
  <div class="todo-container">
    <h1>할일</h1>
    <table class="table-box">
      <td class="top-importance">중요도</td>
      <td class="top-progress">진행률</td>
      <td class="top-content">과제내용</td>
    </table>
    <table class="table-box">
      <tr v-for="(todo, index) in todos" :key="todo.id">
        <td class="item-importance">
          <a
            v-bind:href="'/modal-'+todo.id"
            @click.prevent="showImportance(todo.id)"
            @click="editImportance(todo)"
          >{{todo.importance}}</a>
          <!-- importance modal -->
          <modal v-bind:name="'modal-importance-'+todo.id">
            <h4>중요도 설정</h4>
            <input type="radio" v-bind:id="'one-'+todo.id" value="★" v-model="todo.importance" />
            <label v-bind:for="'one-'+todo.id">{{importanceChoice.one}}</label>
            <input type="radio" v-bind:id="'two-'+todo.id" value="★★" v-model="todo.importance" />
            <label v-bind:for="'two-'+todo.id">{{importanceChoice.two}}</label>
            <br />
            <button @click.prevent="hideImportance(todo.id)">적용</button>
            <button @click.prevent="hideImportance(todo.id)" @click="clearImportance(todo)">취소</button>
          </modal>
          <!-- end importance modal -->
        </td>
        <td class="item-progress">
          <input type="radio" v-bind:id="'high-'+todo.id" value="O" v-model="todo.completed" />
          <label v-bind:for="'high-'+todo.id">{{completedChoice.high}}</label>
          <input type="radio" v-bind:id="'middle-'+todo.id" value="▵" v-model="todo.completed" />
          <label v-bind:for="'middle-'+todo.id">{{completedChoice.middle}}</label>
          <input type="radio" v-bind:id="'low-'+todo.id" value="✕" v-model="todo.completed" />
          <label v-bind:for="'low-'+todo.id">{{completedChoice.low}}</label>
        </td>
        <td
          class="item-content"
          v-if="!todo.editing"
          v-on:dblclick="editTodo(todo)"
        >{{todo.title}} / {{todo.dueDate}} {{todo.dueTime}}</td>
        <input
          class="todo-item-edit"
          type="text"
          v-else
          v-model="todo.title"
          v-on:blur="doneEdit(todo)"
          v-on:keyup.enter="doneEdit(todo)"
          v-on:keyup.esc="cancelEdit(todo)"
          v-focus
        />
        <td class="item-time" id="btns">
          <a
            v-bind:href="'/modal-'+todo.id"
            @click.prevent="showDue(todo.id)"
            @click="editDue(todo)"
          >시간</a>
          <!-- dueDate modal -->
          <modal v-bind:name="'modal-due-'+todo.id">
            {{todo.id}} / {{todo.title}}
            <div>
              <h4>마감기한</h4>
              <input type="date" v-model="todo.dueDate" />
              <input type="time" v-model="todo.dueTime" />
              <div v-if="todo.completed!=='O'">
                <h4>미루기</h4>
                <input type="checkbox" @click="setDate(todo)" />
                내일{{tomorrow}}
                <input type="checkbox" />
                <input type="date" v-model="todo.dueDate" />
                <input type="checkbox" />안함
              </div>
              <br />
              <button @click.prevent="hideDue(todo.id)">적용</button>
              <button @click="clearTime(todo)" @click.prevent="hideDue(todo.id)">취소</button>
            </div>
          </modal>
          <!-- end dueDate modal -->
        </td>
        <td class="item-delete" id="btns" v-on:click="removeTodo(index)">삭제</td>
      </tr>
      <tr class="add-btn-tr">
        <div id="btns" v-on:click="addTodo()">추가하기</div>
      </tr>
    </table>
    <!-- <div>달성률: {{rate()}}%</div> -->
  </div>
</template>

<script>
var today = new Date();

export default {
  name: "todo-list",
  data: function() {
    return {
      newTodo: "",
      todoID: 3,
      importanceChoice: { one: "★", two: "★★" },
      completedChoice: { low: "✕", middle: "▵", high: "O" },
      // rate: function() {
      //   var count = 0;
      //   this.todos.forEach(function(i) {
      //     if (i.completed === "O") {
      //       count++;
      //     }
      //   });
      //   return Math.round((count / this.todos.length) * 100);
      // }, 하면 computed로
      beforeEditCache: "",
      beforeEditCacheImportance: "",
      beforeEditCacheDate: "",
      beforeEditCacheTime: "",
      tomorrow:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        (today.getDate() + 1),
      todos: [
        {
          id: 1,
          title: "밥먹기",
          completed: "",
          importance: "★",
          editing: false,
          dueDate: "",
          dueTime: ""
        },
        {
          id: 2,
          title: "산책하기",
          completed: "",
          importance: "★",
          editing: false,
          dueDate: "",
          dueTime: ""
        }
      ]
    };
  },
  methods: {
    addTodo: function() {
      this.todos.push({
        id: this.todoID,
        title: this.newTodo,
        completed: "",
        importance: "★",
        editing: false,
        dueDate: "",
        dueTime: ""
      });

      this.todoID++;
      this.newTodo = "";
    },
    // todo 삭제
    removeTodo: function(index) {
      this.todos.splice(index, 1);
    },
    // todo 수정
    editTodo: function(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    // todo 수정완료
    doneEdit: function(todo) {
      if (todo.title.trim() == "") {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    // todo 수정취소
    cancelEdit: function(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },

    /* importance modal */
    showImportance(el) {
      var num = el;
      this.$modal.show("modal-importance-" + num);
    },
    hideImportance(el) {
      var num = el;
      this.$modal.hide("modal-importance-" + num);
    },
    editImportance(todo) {
      this.beforeEditCacheImportance = todo.importance;
    },
    clearImportance(todo) {
      todo.importance = this.beforeEditCacheImportance;
    },

    /* due modal */
    showDue(el) {
      var num = el;
      this.$modal.show("modal-due-" + num);
    },
    hideDue(el) {
      var num = el;
      this.$modal.hide("modal-due-" + num);
    },
    editDue(todo) {
      this.beforeEditCacheDate = todo.dueDate;
      this.beforeEditCacheTime = todo.dueTime;
    },
    clearTime(todo) {
      todo.dueDate = this.beforeEditCacheDate;
      todo.dueTime = this.beforeEditCacheTime;
    },
    setDate(todo) {
      todo.dueDate = this.tomorrow;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
.table-box {
  border: 1px solid gray;
  border-collapse: collapse;
  width: 100%;
}
/*  */
.table-box-main {
  border: 1px solid gray;
  border-collapse: collapse;
}
.top-importance {
  width: 10% !important;
}
.top-progress {
  width: 15% !important;
}
.top-content {
  width: 80% !important;
}
/*  */
.item-importance,
.item-time,
.item-delete {
  width: 10% !important;
}
.item-progress {
  width: 15% !important;
}
.item-content {
  width: 55% !important;
}

.add-btn-tr {
  width: 100%;
}
.table-box-item {
  border: 1px solid gray;
  border-collapse: collapse;
}
/*  */
#btns {
  cursor: pointer;
}
.todo-item-edit {
  margin-left: 1rem;
  padding: 0.8rem;
  border: 1px #ccc solid;
}
</style>