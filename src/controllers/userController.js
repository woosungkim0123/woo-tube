import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2)
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "패스워드가 일치하지않습니다",
    });

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists)
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 존재하는 아이디 / email 입니다",
    });
  /*
  const emailExists = await User.exists({ email });
  if (emailExists)
    return res.render("join", {
      pageTitle,
      errorMessage: "이미 존재하는 이메일 입니다",
    });
    */
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "계정이 없습니다" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "비번틀림" });
  console.log("로그인");

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const logout = (req, res) => {
  req.session.destroy(function (err) {
    console.log("로그아웃");
  });
  return res.redirect("/");
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: "f8ac811eea91980ae607",
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = (req, res) => {};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const see = (req, res) => res.send("See User");
