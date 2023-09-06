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
        <div v-if="showAlertBox" id="alert-box">
            <p id="message">{{ alertMessage }}</p>
            <button id="alert-btn" @click="closeAlertBox">OK</button>
        </div>
        <div class="screen">
            <div class="screen_content">
                <form class="login" @submit.prevent="login">
                    <h2 class="login_title">Log in</h2>
                    <div class="login_field">
                        <i class="login_icon fas fa-user"></i>
                        <input
                            type="text"
                            class="login_input"
                            name="username"
                            placeholder="Username"
                            v-model="username"
                        />
                    </div>
                    <div class="login_field">
                        <i class="login_icon fas fa-lock"></i>
                        <input
                            type="password"
                            class="login_input"
                            name="password"
                            placeholder="Password"
                            v-model="password"
                        />

                    </div>
                    <button class="login_submit" id="login-btn" type="submit">
                        <span class="button_text">Log In Now</span>
                        <i class="button_icon fas fa-chevron-right"></i>
                    </button>
                    <button
                        class="login_submit"
                        id="to-signup-btn"
                        @click="navigateToSignup"
                    >
                        <span class="button_text">Or Sign Up Here</span>
                        <i class="button_icon fas fa-chevron-right"></i>
                    </button>
                </form>
                <div class="social_login">
                    <h3>or log in with</h3>
                    <div class="social_icons">
                        <a
                            href="#"
                            class="social_login_icon fab fa-instagram"
                        ></a>
                        <a
                            href="#"
                            class="social_login_icon fab fa-facebook"
                        ></a>
                        <a
                            href="#"
                            class="social_login_icon fab fa-twitter"
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
    name: "LoginPage",
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
        async login() {
            try {
                const requestBody = {
                    username: this.username,
                    password: this.password,
                };

                console.log(requestBody);

                const response = await fetch(
                    "http://localhost:3000/api/v1/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    }
                );

                if (response.ok) {
                    this.showMessage("Login successful");
                } else {
                    const errorMessage = await response.text();
                    if (errorMessage) {
                        this.showMessage(errorMessage);
                    }// Show a generic error message
                }
            } catch (error) {
                console.error(error);
            }
        },
        navigateToSignup() {
            this.$router.push("/signup"); // Navigate to the /signup route
        },
        showMessage(message) {
            // Update the alertMessage and showAlertBox data properties
            this.alertMessage = message;
            this.showAlertBox = true;
        },
        closeAlertBox() {
            // Close the alert box
            this.showAlertBox = false;
        },
    },
    data() {
        return {
            loaderVisible: true,
            showAlertBox: false,
            alertMessage: "",
            username: "",
            password: "",
        };
    },
};
</script>
<style scoped>
@import "../assets/css/login-signup-common.css";
</style>
