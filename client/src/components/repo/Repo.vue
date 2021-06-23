<template>
  <div>
    <Nav></Nav>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.isbn.includes(search) ||
            data.author.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 80%; margin: 30px auto"
    >
      <el-table-column label="課程" prop="isbn"> </el-table-column>
      <el-table-column label="學院" prop="name"> </el-table-column>
      <el-table-column label="教師" prop="author"> </el-table-column>
      <el-table-column label="地點" prop="pubDate"> </el-table-column>
      <el-table-column label="容量" prop="stock"> </el-table-column>
      <el-table-column label="開設學年" prop="cost"> </el-table-column>
      <el-table-column align="right" width="250">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="medium"
            placeholder="Type to search"
          />
        </template>
        <template slot-scope="scope">
          <InN style="margin-right: 10px"></InN>
          <el-button type="plain" size="medium" @click="pop"
            >Purchase</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Nav from "../nav/Out";
import InN from "../InN";
export default {
  name: "Repo",
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  methods: {
    pop() {
      this.$message("Please login first.");
    },
  },
  created() {
    this.$http
      .get("http://localhost:4025/student/none")
      .then((res) => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  components: {
    Nav,
    InN,
  },
};
</script>

<style>
.el-table {
  font-size: 16px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.el-table td,
.el-table th {
  text-align: center;
}
</style>