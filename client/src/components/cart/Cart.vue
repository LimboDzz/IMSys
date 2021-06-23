<template>
  <div>
    <Nav></Nav>
    <el-table :data="tableData" border style="width: 80%; margin: 30px auto">
      <el-table-column label="Cno" prop="Cno"> </el-table-column>
      <el-table-column label="Course" prop="Course"> </el-table-column>
      <el-table-column label="Span" prop="Span"> </el-table-column>
      <el-table-column label="Type" prop="Type"> </el-table-column>
      <el-table-column label="Teacher" prop="Teacher"> </el-table-column>
      <el-table-column label="Title" prop="Title"> </el-table-column>
      <el-table-column align="center" width="200" label="Operation">
        <!-- <template slot-scope="scope">
          <el-button
            size="medium"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Nav from "../nav/In";
import InN from "../InN";
export default {
  name: "Cart",
  data() {
    return {
      tableData: [],
      search: "",
      account: {},
    };
  },
  methods: {
    // handleDelete(index, row) {
    //   // console.log(row);
    //   let mock = JSON.parse(JSON.stringify(row));
    //   console.log(mock);
    //   this.$http
    //     .post("http://localhost:4025/stu/delete", mock)
    //     .then((res) => {
    //       this.login();
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = "Total";
    //       return;
    //     }
    //     const values = data.map((item) => Number(item[column.property]));
    //     if (!values.every((value) => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr);
    //         if (!isNaN(value)) {
    //           return prev + curr;
    //         } else {
    //           return prev;
    //         }
    //       }, 0);
    //     } else {
    //       sums[index] = "";
    //     }
    //   });

    //   columns.forEach((column, index) => {
    //     if (index == 5) {
    //       const values = data.map((item) => Number(item[column.property]));
    //       if (!values.every((value) => isNaN(value))) {
    //         this.sum = values.reduce((prev, curr) => {
    //           const value = Number(curr);
    //           if (!isNaN(value)) {
    //             return prev + curr;
    //           } else {
    //             return prev;
    //           }
    //         }, 0);
    //       }
    //     }
    //   });
    //   return sums;
    // },
    login() {
      this.$http
        .get("http://localhost:4025/stu/myCourses")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      this.$http
        .get("http://localhost:4025/user/loginUser")
        .then((res) => {
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
  },
  created() {
    this.login();
  },
  components: {
    Nav,
    InN,
    // Popup
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