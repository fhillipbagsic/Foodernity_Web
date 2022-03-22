const logout = async () => {
  localStorage.setItem("token", "");
  window.location.replace("/");
};

export default logout;
