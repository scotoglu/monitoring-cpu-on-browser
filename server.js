//imports libraries
const express = require("express");
const info = require("systeminformation");

//initialize the express
const app = express();

/*All requests for client-side. */
//gets disk ınformation
app.get("/api/disk", (req, res) => {
  info
    .diskLayout()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//gets current cpu usage
app.get("/api/currentLoad", (req, res) => {
  info
    .currentLoad()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      err => {
        res.json(err);
      };
    });
});

//gets working services information
app.get("/api/process", (req, res) => {
  info
    .processes()
    .then(data => {
      res.json(data.list);
    })
    .catch(err => {
      err => {
        res.json(err);
      };
    });
});

//gets wifi information
app.get("/api/wifi", (req, res) => {
  info
    .wifiNetworks()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      err => {
        res.json(err);
      };
    });
});

//gets cpu information
app.get("/api/cpu", (req, res) => {
  info
    .cpu()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//gets graphics information
app.get("/api/graphics", (req, res) => {
  info
    .graphics()
    .then(data => {
      res.json(data.controllers);
    })
    .catch(err => {
      res.json(err);
    });
});

//gets memory ınformation
app.get("/api/mem", (req, res) => {
  info
    .mem()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Which port will be use
const port = 5000;

//Server starts
app.listen(port, () => console.log(`Server started on port ${port}`));
