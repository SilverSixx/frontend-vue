<template>
    <div class="loader_bg" v-if="loaderVisible">
        <div class="loader">
            <img src="../assets/images/loading.gif" alt="#" />
        </div>
    </div>
    <div class="header">
        <div class="left-section">
            <router-link to="/">
                <img src="../assets/images/logo.png" alt="" />
            </router-link>
        </div>
    </div>
    <div class="container">
        <div v-if="alertBoxSuccessVisible" id="alert-box-success">
            <p id="success-message">{{ successMessage }}</p>
            <button id="success-button" @click="hideSuccessAlert">OK</button>
        </div>

        <div v-if="alertBoxFailVisible" id="alert-box-fail">
            <p id="fail-message">{{ failMessage }}</p>
            <button id="fail-button" @click="hideFailureAlert">
                TRY AGAIN
            </button>
        </div>

        <div class="screen">
            <div class="screen_content">
                <form class="signup" @submit.prevent="signup">
                    <h2 class="signup_title">Sign Up</h2>
                    <div class="signup_field">
                        <input
                            type="text"
                            class="signup_input"
                            name="username"
                            placeholder="Username"
                            v-model="username"
                        />
                        <i class="signup_icon fa fa-envelope"></i>
                    </div>
                    <div class="signup_field">
                        <input
                            class="signup_input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            v-model="password"
                        />
                        <i class="signup_icon fa fa-lock"></i>
                    </div>
                    <div class="signup_field">
                        <input
                            type="text"
                            class="signup_input"
                            name="fullname"
                            placeholder="FullName"
                            v-model="fullname"
                        />
                        <i class="signup_icon fa fa-user"></i>
                    </div>
                    <div class="signup_field">
                        <input
                            class="signup_input"
                            type="text"
                            name="PhoneNumber"
                            placeholder="PhoneNumber"
                            v-model="phoneNumber"
                        />
                        <i class="signup_icon fa fa-user"></i>
                    </div>
                    <button type="submit" id="submit-btn" class="signup_submit">
                        <span class="button_text">Sign Up</span>
                        <i class="button_icon fas fa-chevron-right"></i>
                    </button>
                </form>
                <div class="social_register">
                    <h3>sign up with</h3>
                    <div class="social_icons">
                        <a
                            href="#"
                            class="social_register_icon fab fa-instagram"
                        ></a>
                        <a
                            href="#"
                            class="social_register_icon fab fa-facebook"
                        ></a>
                        <a
                            href="#"
                            class="social_register_icon fab fa-twitter"
                        ></a>
                    </div>
                </div>
            </div>
            <div class="screen_background">
                <span
                    class="screen_background_shape screen_background_shape4"
                ></span>
                <span
                    class="screen_background_shape screen_background_shape3"
                ></span>
                <span
                    class="screen_background_shape screen_background_shape2"
                ></span>
                <span
                    class="screen_background_shape screen_background_shape1"
                ></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SignUpPage",
    created() {
        setTimeout(() => {
            this.loaderVisible = false;
        }, 1500);
    },
    methods: {
        fadeOutLoader() {
            // Use Vue.js to hide the loader
            this.loaderVisible = false;
        },
        async signup() {
            const { username, password, fullname, phoneNumber } = this.$refs.signupForm.$data;
            try {
                const response = await this.$axios.post("/api/v1/register", {
                    username,
                    password,
                    fullname,
                    phoneNumber,
                });

                if (response.status === 200) {
                    this.$toast.success("Signup successful!");
                    this.$router.push("/login");
                } else {
                    this.$toast.error(response.data.message);
                }
            } catch (error) {
                this.$toast.error(error.message);
            }
        },
        showSuccess(message) {
            this.successMessage = message;
            this.alertBoxSuccessVisible = true;
        },
        hideSuccessAlert() {
            this.alertBoxSuccessVisible = false;
            // Redirect to the login page
            this.$router.push("/login");
        },
        showFailure(message) {
            this.failMessage = message;
            this.alertBoxFailVisible = true;
        },
        hideFailureAlert() {
            this.alertBoxFailVisible = false;
        },
    },
    data() {
        return {
            username: "",
            password: "",
            fullname: "",
            phoneNumber: "",
            loaderVisible: true,
            alertBoxSuccessVisible: false,
            alertBoxFailVisible: false,
            successMessage: "",
            failMessage: "",
        };
    },
};
</script>
<style scoped>
@import "../assets/css/login-signup-common.css";
#alert-box-fail {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
    z-index: 1000;
}

#fail-message {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
