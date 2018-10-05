const geocoder = require('./../index');

geocoder.selectProvider("geonames", {
  "username": "npmunittests"
});


async function geocoder_promise_test(loc) {
  var res = {};
  res.state = "ok";

  try {
    res.data = await geocoder.geocode(loc);
  } catch(e) {
    res.state = "ERROR";
    res.error = e;
    console.error("ERROR geocoder", e);
  }
  return res;
}

function geocoder_test(loc, cbk) {
  var res = {};
  res.state = "ok";
  return geocoder.geocode(loc, (err, res) => {
    if (err) cbk(err)
    else cbk(null, res);
  });
}

module.exports.geocoder_promise_test = geocoder_promise_test;

if (typeof require != 'undefined' && require.main == module) {
  geocoder_promise_test("Paris, France")
      .then((data) => {
        console.log("RES:", data.data);
      })
  geocoder_test("Paris, France", (err, data) => {
    if (err) console.error("ERROR:", err);
    else console.log("RES:", data);
  })
}
