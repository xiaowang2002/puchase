<template>
  <el-container>
    <el-header
        style="background-color: antiquewhite; display: flex; justify-content: space-between; align-items: center;">
      <ul style="list-style: none;">
        <li style="font-size: 30px; line-height: 30px;"><strong>采购管理系统</strong></li>
        <li style="margin-left: 40px;" @click="$router.push({path:'/list',query:{type:1}})"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :style="{cursor: hover ? 'pointer' : 'default'}">平台动态
        </li>
        <li style="margin-left: 40px;"
            @click="$router.push({ path: '/list', query: { type: 2 } })"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :style="{cursor: hover ? 'pointer' : 'default'}">政策法规
        </li>
        <li style="margin-left: 40px;"
            @click="$router.push({ path: '/list', query: { type: 3 } })"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :style="{cursor: hover ? 'pointer' : 'default'}">违规投诉
        </li>
      </ul>
      <span style="display: flex; align-items: center;flex-direction: column;">
        <el-button icon="el-icon-user-solid" style="margin-right: 10px;"></el-button>
        <span>admin ^</span>
      </span>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      hover: false
    }
  }
};
</script>

<style scoped>
li {
  display: inline;
}

ul {
  text-align: left;
  padding-left: 20px;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 635px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  height: 260px;
}

.el-container:nth-child(7) .el-aside {
  height: 320px;
}
</style>
