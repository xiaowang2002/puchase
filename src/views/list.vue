<template>

  <div>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        @row-click="toDetails">
      <el-table-column
          prop="listId"
          label="序号"
          width="200">
      </el-table-column>
      <el-table-column
          prop="title"
          label="动态标题"
          width="450">
      </el-table-column>
      <el-table-column
          prop="img"
          label="icon"
          width="390">
      </el-table-column>
      <el-table-column
          prop="releaseTime"
          width="400"
          label="发布时间">
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "list",
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      type: 1,
      total: '',
      tableData: []
    }
  },
  created() {
    let type = this.$route.query.type
    this.getList(type)
  },
  methods: {
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList();
    },
    getList(type1) {
      // ajax   接口地址、请求方式
      axios.get('http://localhost:9090/procurement/getListByPage', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          type: type1
        }
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data.data
        this.total = res.data.total
      })
          .catch(e => {
          })
          .finally(() => {
          })
    },
    toDetails(row) {
      let data = {
        attachment: row.attachment,
        img: row.img,
        listId: row.listId,
        listType: row.listType,
        publisher: row.publisher,
        releaseTime: row.releaseTime,
        sketch: row.sketch,
        text: row.text,
        title: row.title
      }
      this.$router.push({
        path: '/detail',
        query: {
          data: data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>