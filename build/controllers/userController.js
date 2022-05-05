"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.see = exports.remove = exports.logout = exports.login = exports.join = exports.edit = void 0;

var join = function join(req, res) {
  return res.send("가입");
};

exports.join = join;

var login = function login(req, res) {
  return res.send('login User');
};

exports.login = login;

var logout = function logout(req, res) {
  return res.send('logout User');
};

exports.logout = logout;

var edit = function edit(req, res) {
  return res.send('Edit User');
};

exports.edit = edit;

var remove = function remove(req, res) {
  return res.send('Delete User');
};

exports.remove = remove;

var see = function see(req, res) {
  return res.send('See User');
};

exports.see = see;