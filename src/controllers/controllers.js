import { setExpiry, checkExpiration } from "../helpers";
import Url from "../schema/Url";

export const handleAnalytics = function (req, res) {
  try {
    Url.find({}, function (err, urls) {
      res.json(urls);
    });
  } catch (error) {
    console.error(error);
    res.send(err);
  }
};

export const renderHomePage = (req, res) => {
  try {
    res.set("Content-Type", "text/html");
    res.render("../src/views/index.ejs", null);
    return res.end();
  } catch (error) {
    console.error(error);
    res.end();
  }
};

export const handleTinyUrl = async (req, res) => {
  const url = req.body.url;
  const expiration = setExpiry();
  const customAlias = req.body.customAlias;
  const instance = new Url({
    url: url,
    customAlias: customAlias,
    expiration: expiration,
  });
  let id;
  if (customAlias) {
    id = customAlias;
  } else {
    let short = JSON.stringify(instance._id);
    id = short.slice(short.length - 7, short.length - 1);
  }
  instance.id = id;
  instance.expiration = expiration;
  await instance.save();
  res.send({
    message: `${id} was created`,
    url: `${id}`,
  });
};

export const handleRedirect = async (req, res) => {
  const route = req.params.route;
  const instance = await Url.findOne({ id: route });

  if (instance && !checkExpiration(instance.expiration)) {
    // res.send(instance);
    instance.visitors = instance.visitors
      ? instance.visitors + 1
      : instance.__v + 1;
    await instance.save();
    res.redirect(`//${instance.url}`);
  } else {
    res.send("Expired");
  }
};
