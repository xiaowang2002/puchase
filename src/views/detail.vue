<template>
  <div style="text-align: left">
    <div>公告信息:</div>
    <div v-html="list.text"></div>
    <div>发布企业:{{ list.publisher }}</div>
    <div>发布时间:{{ list.releaseTime }}</div>
    <div style="cursor: pointer;color: red;" v-for="item in fujian" :key="item" @click="sc(item)">{{ item }}
    </div>
    <button @click="getToken()">获取token</button>
    <a href="localhost:9090/common/download?fileName=2023年项目清单样式表.xlsx&delete=false&token=" download>下载文件</a >
    <div>&nbsp;</div>
    <div>&nbsp;</div>
  </div>
</template>

<script>
import axios from 'axios';
import {Loading} from "element-ui";

export default {
  data() {
    return {
      list: {},
      fujian: [],
      downloadLoadingInstance: ''
    }
  },
  props: ['data'],
  mounted() {
    let detailArr = this.$route.query.data
    this.list = detailArr
    this.add()
  },
  methods: {
    add() {
      let str = this.list.attachment
      while (true) {
        let a = str.indexOf(",")
        if (a != -1) {
          let b = str.slice(0, a)
          str = str.slice(a + 1, str.length)
          this.fujian.push(b)
        }
        if (a == -1) {
          let b = str.slice(0, str.length)
          this.fujian.push(b)
          break
        }
      }
    },
    async sc(item) {
      console.log(item);
      console.log(localStorage.getItem('token'));
      axios({
        method: "GET",
        url: 'http://localhost:9090/common/download',
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
        params: {
          fileName: "2023年项目清单样式表.xlsx",
          delete: false
        },
      })
    },
    async getToken() {
      const res = await axios.post(
          'http://localhost:9090/login', {username: "admin", password: "admin123"}
      )
      console.log(res.data);
      localStorage.setItem('token', res.data.token)
    },
    download(url, params, filename, config) {
      this.downloadLoadingInstance = Loading.service({
        text: "正在下载数据，请稍候",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      })
      return axios.get(url, params, {
        transformRequest: [(params) => {
          return tansParams(params)
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: 'blob',
        ...config
      }).then(async (data) => {
        const isBlob = blobValidate(data);
        if (isBlob) {
          const blob = new Blob([data])
          saveAs(blob, filename)
        } else {
          const resText = await data.text();
          const rspObj = JSON.parse(resText);
          const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
          Message.error(errMsg);
        }
        downloadLoadingInstance.close();
      }).catch((r) => {
        console.log(r)
        console.error(r)
        Message.error('下载文件出现错误，请联系管理员！')
        downloadLoadingInstance.close();
      })
    }

  }
}
</script>

<style></style>


