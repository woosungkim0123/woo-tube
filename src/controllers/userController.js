export const join = (req, res) => res.send("가입");
export const edit = (req, res) => res.send('Edit User');
export const remove = (req, res) => {
  console.log(req.data)
  res.send('Delete User')
}