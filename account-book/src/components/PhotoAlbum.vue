<template>
  <div class="photo-container">
    <h1>포토앨범</h1>
    <div>
      <!-- top-box -->
      <div class="top-box">
        <!-- img button-1 -->
        <img
          class="img-btn"
          :src="require('../assets/one.png')"
          @click="formSelected(0, 'one')"
          v-if="!forms[0].one"
        />
        <img
          v-else
          class="img-btn selected"
          :src="require('../assets/oneS.png')"
          @click="formSelected(0, 'one')"
        />
        <!-- img button-2 -->
        <img
          class="img-btn"
          :src="require('../assets/two.png')"
          @click="formSelected(1, 'two')"
          v-if="!forms[1].two"
        />
        <img
          v-else
          class="img-btn selected"
          :src="require('../assets/twoS.png')"
          @click="formSelected(1, 'two')"
        />
        <!-- img button-3 -->
        <img
          class="img-btn"
          :src="require('../assets/three.png')"
          @click="formSelected(2, 'three')"
          v-if="!forms[2].three"
        />
        <img
          v-else
          class="img-btn selected"
          :src="require('../assets/threeS.png')"
          @click="formSelected(2, 'three')"
        />
        <!-- img button-4 -->
        <img
          class="img-btn"
          :src="require('../assets/four.png')"
          @click="formSelected(3, 'four')"
          v-if="!forms[3].four"
        />
        <img
          v-else
          class="img-btn selected"
          :src="require('../assets/fourS.png')"
          @click="formSelected(3, 'four')"
        />
        <!-- img button-5 -->
        <img
          class="img-btn"
          :src="require('../assets/five.png')"
          @click="formSelected(4, 'five')"
          v-if="!forms[4].five"
        />
        <img
          v-else
          class="img-btn selected"
          :src="require('../assets/fiveS.png')"
          @click="formSelected(4, 'five')"
        />
      </div>
      <br />

      <!-- photo-box -->
      <div class="photo-box">
        <!-- photo-1 -->
        <div class="form-one" v-if="forms[0].one">
          <div class="grid-item" id="one-item1">
            <img
              class="one-img-0"
              v-for="(imgObj, index) in images"
              :key="index"
              :src="require('../assets/'+imgObj[index+1])"
              :alt="imgObj[index+1]"
            />
            <img id="plus-img-btn" @click="clickInputOne(1)" :src="require('../assets/plus.png')" />
            <input
              class="photo-input"
              type="file"
              id="input-1"
              ref="input-1"
              @input="setID(1)"
              @change="addImage"
            />
          </div>
        </div>
        <!-- photo-2 -->
        <div class="form-two" v-if="forms[1].two">
          <div v-for="(n, index) in 2" :key="index" class="grid-item" :id="'two-item'+n">
            <template v-for="(imgObj, j) in images">
              <img
                :key="j"
                v-if="(imgIndex[j])===n"
                :src="require('../assets/'+imgObj[j+1])"
                :alt="imgObj[j+1]"
              />
            </template>

            <img
              id="plus-img-btn"
              @click="clickInputOthers(n)"
              :src="require('../assets/plus.png')"
            />
            <input
              class="photo-input"
              type="file"
              :id="'input-'+n"
              :ref="'input-'+n"
              @input="setID(n)"
              @change="addImage"
            />
          </div>
        </div>
        <!-- photo-3 -->
        <div class="form-three" v-if="forms[2].three">
          <div v-for="(n, index) in 3" :key="index" class="grid-item" :id="'three-item'+n">
            <template v-for="(imgObj, j) in images">
              <img
                :key="j"
                v-if="(imgIndex[j])===n"
                :src="require('../assets/'+imgObj[j+1])"
                :alt="imgObj[j+1]"
              />
            </template>

            <img
              id="plus-img-btn"
              @click="clickInputOthers(n)"
              :src="require('../assets/plus.png')"
            />
            <input
              class="photo-input"
              type="file"
              :id="'input-'+n"
              :ref="'input-'+n"
              @input="setID(n)"
              @change="addImage"
            />
          </div>
        </div>
        <!-- photo-4 -->
        <div class="form-four" v-if="forms[3].four">
          <div v-for="(n, index) in 4" :key="index" class="grid-item" :id="'four-item'+n">
            <template v-for="(imgObj, j) in images">
              <img
                :key="j"
                v-if="(imgIndex[j])===n"
                :src="require('../assets/'+imgObj[j+1])"
                :alt="imgObj[j+1]"
              />
            </template>

            <img
              id="plus-img-btn"
              @click="clickInputOthers(n)"
              :src="require('../assets/plus.png')"
            />
            <input
              class="photo-input"
              type="file"
              :id="'input-'+n"
              :ref="'input-'+n"
              @input="setID(n)"
              @change="addImage"
            />
          </div>
        </div>
        <!-- photo-5 -->
        <div class="form-five" v-if="forms[4].five">
          <div v-for="(n, index) in 5" :key="index" class="grid-item" :id="'five-item'+n">
            <template v-for="(imgObj, j) in images">
              <img
                :key="j"
                v-if="(imgIndex[j])===n"
                :src="require('../assets/'+imgObj[j+1])"
                :alt="imgObj[j+1]"
              />
            </template>

            <img
              id="plus-img-btn"
              @click="clickInputOthers(n)"
              :src="require('../assets/plus.png')"
            />
            <input
              class="photo-input"
              type="file"
              :id="'input-'+n"
              :ref="'input-'+n"
              @input="setID(n)"
              @change="addImage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<script>
export default {
  name: "photo-album",
  data() {
    return {
      imgID: 1,
      // image obj {index:이미지네임}
      images: [],
      imgIndex: [],

      formName: "one",
      forms: [
        { one: true },
        { two: false },
        { three: false },
        { four: false },
        { five: false }
      ]
    };
  },
  methods: {
    formSelected(num, name) {
      this.formName = name;

      this.forms[0]["one"] = false;
      this.forms[1]["two"] = false;
      this.forms[2]["three"] = false;
      this.forms[3]["four"] = false;
      this.forms[4]["five"] = false;

      this.forms[num][name] = true;

      // 초기화
      this.imgID = 1;
      this.images = [];
      this.imgIndex = [];
    },
    // images array에 추가
    addImage(e) {
      var obj = {};
      obj[this.imgID] = e.target.files[0].name;
      this.images.push(obj);
      this.imgID++;
    },
    // 추가된 이미지의 인덱스 값을 imgIndex array에 추가
    setID(index) {
      this.imgIndex.push(index);
    },
    clickInputOne(index) {
      var id = "input-" + index;
      this.$refs[id].click();
    },
    clickInputOthers(index) {
      var id = "input-" + index;
      this.$refs[id][0].click();
    }
  }
};
</script>

<style>
/* top-box */
.top-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.img-btn:hover {
  cursor: pointer;
}
.selected {
  background-color: lightgrey;
}

/* photo-box */

.photo-box {
  display: flex;
  justify-content: center;
}
.grid-item {
  border: 1px gray solid;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.photo-input {
  display: none;
}
#plus-img-btn {
  width: 100px !important;
  height: 100px !important;
}
#plus-img-btn:hover {
  cursor: pointer;
}
/* photo-box-1 */
.form-one {
  display: grid;
  width: 600px;
  height: 500px;
  border: 1px solid gray;
}
#one-item1 {
  grid-column: 1;
  grid-row: 1;
}
#one-item1 > img:nth-child(1) {
  width: 600px;
  height: 500px;
  object-fit: cover;
}
/* photo-box-2 */
.form-two {
  display: grid;
  width: 600px;
  height: 500px;
  border: 1px solid gray;
  grid-template-columns: 300px 300px;
  grid-template-rows: 500px;
}
#two-item1 {
  grid-column: 1;
  grid-row: 1;
}
#two-item2 {
  grid-column: 2;
  grid-row: 1;
}
#two-item1 > img:nth-child(1),
#two-item2 > img:nth-child(1) {
  width: 300px;
  height: 500px;
  object-fit: cover;
}
/* photo-box-3 */
.form-three {
  display: grid;
  width: 600px;
  height: 500px;
  border: 1px solid gray;
  grid-template-columns: 300px 300px;
  grid-template-rows: 250px 250px;
}
#three-item1 {
  grid-column: 1;
  grid-row: 1 / span 2;
}
#three-item2 {
  grid-column: 2;
  grid-row: 1;
}
#three-item3 {
  grid-column: 2;
  grid-row: 2;
}
#three-item1 > img:nth-child(1) {
  width: 300px;
  height: 500px;
  object-fit: cover;
}
#three-item2 > img:nth-child(1),
#three-item3 > img:nth-child(1) {
  width: 300px;
  height: 250px;
  object-fit: cover;
}
/* photo-box-4 */
.form-four {
  display: grid;
  width: 600px;
  height: 500px;
  border: 1px solid gray;
  grid-template-columns: 300px 300px;
  grid-template-rows: 250px 250px;
}
#four-item1 {
  grid-column: 1;
  grid-row: 1;
}
#four-item2 {
  grid-column: 2;
  grid-row: 1;
}
#four-item3 {
  grid-column: 1;
  grid-row: 2;
}
#four-item4 {
  grid-column: 2;
  grid-row: 2;
}
#four-item1 > img:nth-child(1),
#four-item2 > img:nth-child(1),
#four-item3 > img:nth-child(1),
#four-item4 > img:nth-child(1) {
  width: 300px;
  height: 250px;
  object-fit: cover;
}
/* photo-box-5 */
.form-five {
  display: grid;
  width: 600px;
  height: 500px;
  border: 1px solid gray;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: 250px 250px;
}
#five-item1 {
  grid-column: 1 / span 2;
  grid-row: 1;
}
#five-item2 {
  grid-column: 3 / span 2;
  grid-row: 1;
}
#five-item3 {
  grid-column: 5 / span 2;
  grid-row: 1;
}
#five-item4 {
  grid-column: 1 / span 3;
  grid-row: 2;
}
#five-item5 {
  grid-column: 4 / span 3;
  grid-row: 2;
}
#five-item1 > img:nth-child(1),
#five-item2 > img:nth-child(1),
#five-item3 > img:nth-child(1) {
  width: 200px;
  height: 250px;
  object-fit: cover;
}
#five-item4 > img:nth-child(1),
#five-item5 > img:nth-child(1) {
  width: 300px;
  height: 250px;
  object-fit: cover;
}
</style>