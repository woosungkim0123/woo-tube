export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = (req, res) => {
  console.log(req.body);
  res.end();
};
export const login = (req, res) => res.send("login User");
export const logout = (req, res) => res.send("logout User");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const see = (req, res) => res.send("See User");
