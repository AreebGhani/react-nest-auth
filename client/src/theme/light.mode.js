export const lightMode = `
body {
  background-color: rgb(230, 230, 230);
  color: black;
}
.bg-color, .form-control, .form-control:focus, .input-group-text {
  background-color: white;
}
.text-color, .form-control, .form-control:focus, .input-group-text {
  color: black;
}
.navbar-nav .nav-link.active, navbar-brand.active {
  color: black;
}
.nav-link:hover, .navbar-brand:hover {
  color: darkgray;
}
.form-check-input:checked {
  background-color: white;
  border-color: black;
}
.form-check-input:focus {
  border-color: black;
  box-shadow: 0 0 0 0.1rem black;
}
`;
