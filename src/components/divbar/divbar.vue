<template>
  <div class="divbar">
    <span class="divbar-sp">{{name}}</span>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
  activated() {},
};
</script>
<style scoped>
.divbar {
  width: 100%;
  height: 40px;
  background-color: #0081cc;
  border-left: 10px #0a3190 solid;
  border-radius: 6px;
  margin: 0 0 20px;
  padding-left: 10px;
  color: #ffffff;
  display: table;
}
.divbar-sp {
  font-family: 微软雅黑, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  display: table-cell;
  vertical-align: middle;
}
</style>