import axios from "axios";

export default async function Auth() {
  if (localStorage.getItem("Token")) {
    const Token = JSON.parse(localStorage.getItem("Token"));
    await axios({
      url: "https://react-nest-auth.herokuapp.com/profile",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(({ data }) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const credentials = {
          email: user.email,
          password: user.password,
        };
        axios({
          url: "https://react-nest-auth.herokuapp.com/auth/login",
          method: "POST",
          data: credentials,
        })
          .then((res) => {
            if (res.data.access_token) {
              localStorage.setItem(
                "Token",
                JSON.stringify(res.data.access_token)
              );
              localStorage.setItem("user", JSON.stringify(res.data.user));
            }
          })
          .catch((error) => {
            if (localStorage.getItem("Theme")) {
              const Theme = JSON.parse(localStorage.getItem("Theme"));
              sessionStorage.setItem("Theme", JSON.stringify(Theme));
            }
            localStorage.clear();
            if (sessionStorage.getItem("Theme")) {
              const Theme = JSON.parse(sessionStorage.getItem("Theme"));
              localStorage.setItem("Theme", JSON.stringify(Theme));
            }
            sessionStorage.clear();
          });
      })
      .catch(({ response }) => {
        if (localStorage.getItem("Theme")) {
          const Theme = JSON.parse(localStorage.getItem("Theme"));
          sessionStorage.setItem("Theme", JSON.stringify(Theme));
        }
        localStorage.clear();
        if (sessionStorage.getItem("Theme")) {
          const Theme = JSON.parse(sessionStorage.getItem("Theme"));
          localStorage.setItem("Theme", JSON.stringify(Theme));
        }
        sessionStorage.clear();
      });
  }
}
