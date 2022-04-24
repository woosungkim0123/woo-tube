const pythonShell = require("python-shell");

let abc = [
  {
    name: "hi1",
    age: 202,
    holy: "mo3ly",
  },
  {
    name: "hi1",
    age: 201,
    holy: "mo1ly",
  },
  {
    name: "hi1",
    age: 201,
    holy: "mo1ly",
  },
  {
    name: "hi1",
    age: 201,
    holy: "m1oly",
  },
  {
    name: "hi1",
    age: 201,
    holy: "mo1ly",
  },
  {
    name: "hi1",
    age: 201,
    holy: "mo1ly",
  },
  {
    name: "hi",
    age: 20,
    holy: "moly",
  },
  {
    name: "hi",
    age: 20,
    holy: "moly",
  },
  {
    name: "hi",
    age: 20,
    holy: "moly",
  },
  {
    name: "hi",
    age: 20,
    holy: "moly",
  },
  {
    name: "hi",
    age: 20,
    holy: "moly",
  },
  {
    name: "hi",
    age: 20,
    holy: "moly",
  },
];
abc = JSON.stringify(abc);
const a = (req, res) => {
  var options = {
    mode: "text",
    encoding: "utf8",
    pythonPath: "",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [abc, "c", "d"],
  };

  pythonShell.PythonShell.run(
    "src/controllers/a.py",
    options,
    function (err, results) {
      if (err) console.log(err);
      else console.log(results);
    }
  );

  res.send("hi");
};

export default a;
