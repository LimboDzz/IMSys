<template>
  <div>
    <Nav></Nav>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="120px"
      style="width: 40%; margin: 100px auto"
    >
      <el-form-item label="No.">
        <el-input v-model="ruleForm.Sno"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          type="password"
          v-model="ruleForm.Spwd"
          placeholder="4-20 letters or numbers"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Login</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Nav from "../nav/Out";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        Sno: "",
        Spwd: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let { Sno, Spwd } = this.ruleForm;
      //   console.log(this.ruleForm);
      if (!/^[a-zA-Z0-9]{4,20}$/.test(Spwd)) {
        this.$notify({
          title: "Warning",
          message: "Invalid password",
          type: "warning",
        });
      } else {
        this.$http
          .post("http://localhost:4025/stu/login", this.ruleForm)
          .then((res) => {
            if (res.data.status) {
              this.$notify({
                title: "Success",
                message: res.data.msg,
                type: "success",
              });
              this.$router.push({ path: "/stu" });
            } else
              this.$notify.error({
                title: "Error",
                message: res.data.msg,
              });
          })
          .catch((err) => {
            this.$notify.error({
              title: "Error",
              message: res.data.msg,
            });
          });
      }
    },
    onReset() {
      this.ruleForm = {
        Sno: "",
        Spwd: "",
      };
    },
  },
  components: {
    Nav,
  },
};
</script>

<style>
.el-form-item__label {
  font-size: 16px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
#code:hover {
  cursor: pointer;
}
</style>