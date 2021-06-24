<template>
  <div>
    <Nav></Nav>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.Course.toString().includes(search) ||
            data.Type.toString().includes(search) ||
            data.ExamNature.toString().includes(search) ||
            data.PracticalHours.toString().includes(search) ||
            data.Cno.toString().includes(search) ||
            data.TeachingType.toString().includes(search)
        )
      "
      style="width: 80%; margin: 30px auto"
    >
      <el-table-column label="Cno" prop="Cno"> </el-table-column>
      <el-table-column label="Course" prop="Course"> </el-table-column>
      <el-table-column label="Semester" prop="Semester"> </el-table-column>
      <el-table-column label="Type" prop="Type"> </el-table-column>
      <el-table-column label="ExamNature" prop="ExamNature"> </el-table-column>
      <el-table-column label="LectureHours" prop="LectureHours">
      </el-table-column>
      <el-table-column label="PracticalHours" prop="PracticalHours">
      </el-table-column>
      <el-table-column label="TeachingType" prop="TeachingType">
      </el-table-column>
      <el-table-column align="center" width="250">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="medium"
            placeholder="Type to search"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            type="plain"
            size="medium"
            @click="handleGrading(scope.$index, scope.row)"
            >Grading</el-button
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
  name: "Stu",
  data() {
    return {
      tableData: [],
      search: "",
      account: {},
      num: [],
    };
  },
  methods: {
    handleGrading(index, row) {
      let mock = JSON.parse(JSON.stringify(row));
      this.$http
        .post("http://localhost:4025/gradingCourse", mock)
        .then((res) => {
          this.$router.push({ path: "Grading" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.$http
      .get("http://localhost:4025/teacher/courseList")
      .then((res) => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    this.$http
      .get("http://localhost:4025/user/loginUser")
      .then((res) => {
        console.log(res.data);
        this.account = res.data;
        if (this.account == null) {
          console.log("no account back");
          this.$router.push({ path: "/" });
        }
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