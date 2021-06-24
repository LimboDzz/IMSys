<template>
  <div>
    <Nav></Nav>
    <el-table :data="tableData" border style="width: 80%; margin: 30px auto">
      <el-table-column label="Course" prop="Course"> </el-table-column>
      <el-table-column label="NumOfExam" prop="NumOfExam"> </el-table-column>
      <el-table-column label="Sno" prop="Sno"> </el-table-column>
      <el-table-column label="Sname" prop="Sname"> </el-table-column>
      <el-table-column label="Smajor" prop="Smajor"> </el-table-column>
      <el-table-column label="Score" prop="Score"> </el-table-column>
      <el-table-column align="center" width="200" label="Operation">
        <template slot-scope="scope">
          <el-input v-model="score"></el-input>
          <el-button
            size="medium"
            type="primary"
            @click="handleConfrim(scope.$index, scope.row)"
            >Confirm</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Nav from "../nav/Tin";
import InN from "../InN";
export default {
  name: "Grading",
  data() {
    return {
      tableData: [],
      search: "",
      account: {},
      score: "",
    };
  },
  methods: {
    handleConfrim(index, row) {
      let mock = JSON.parse(JSON.stringify(row));
      console.log(mock);
      mock.score = this.score;
      this.$http
        .post("http://localhost:4025/teacher/confirm", mock)
        .then((res) => {
          this.$message({
            message: res.data.msg,
            type: "message",
          });
          this.login();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    login() {
      this.$http
        .get("http://localhost:4025/gradeCurrentCourse")
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.login();
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
#order {
  font-size: 30px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
</style>