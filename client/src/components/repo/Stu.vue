<template>
  <div>
    <Nav></Nav>
    <el-table
      :data="
        tableData.filter((data) => {
          return (
            !search ||
            data.Course.toString().includes(search) ||
            data.Credit.toString().includes(search) ||
            data.College.toString().includes(search) ||
            data.Teacher.toString().includes(search) ||
            data.Ttitle.toString().includes(search) ||
            data.Cno.toString().includes(search) ||
            data.Type.toString().includes(search)
          );
        })
      "
      style="width: 80%; margin: 30px auto"
    >
      <el-table-column label="Cno" prop="Cno"> </el-table-column>
      <el-table-column label="Course" prop="Course"> </el-table-column>
      <el-table-column label="Credit" prop="Credit"> </el-table-column>
      <el-table-column label="Teacher" prop="Teacher"> </el-table-column>
      <el-table-column label="Ttitle" prop="Ttitle"> </el-table-column>
      <el-table-column label="College" prop="College"> </el-table-column>
      <el-table-column label="Type" prop="Type"> </el-table-column>
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
            @click="handlePurchase(scope.$index, scope.row)"
            >Attend</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Nav from "../nav/In";
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
    handlePurchase(index, row) {
      // console.log(index, row);
      let mock = JSON.parse(JSON.stringify(row));
      this.$http
        .post("http://localhost:4025/stu/attend", mock)
        .then((res) => {
          if (res.data.status)
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          else
            this.$message({
              message: res.data.msg,
              type: "danger",
            });
        })
        .catch((err) => {
          console.error(err);
        });
      // } else {
      //   this.$message.error("Already attend.");
      // }
    },
  },
  created() {
    this.$http
      .get("http://localhost:4025/stu/courseList")
      .then((res) => {
        this.tableData = res.data;
        this.tableData.forEach((data) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
        });
        console.log(this.tableData);
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