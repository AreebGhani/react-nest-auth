export const darkMode = `
body {
  background-color: rgb(40, 40, 40);
  color: white;
}
.bg-color, .form-control, .form-control:focus, .input-group-text {
  background-color: black;
}
.text-color, .form-control, .form-control:focus, .input-group-text {
  color: white;
}
.navbar-nav .nav-link.active, .navbar-brand.active {
  color: white;
}
.nav-link:hover, .navbar-brand:hover {
  color: lightgray;
}
.form-check-input:checked {
  background-color: black;
  border-color: white;
}
.form-check-input:focus {
  border-color: white;
  box-shadow: 0 0 0 0.1rem white;
}
`;
