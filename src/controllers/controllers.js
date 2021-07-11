import { setExpiry, checkExpiration } from "../helpers";
import Url from "../schema/Url";
import { setValue, getValue } from "../services/cacheProvider";
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

export const trackUrlRedirection = async (url) => {
  const instance = await Url.findOne({ id: url });
  if (instance && !checkExpiration(instance.expiration)) {
    // res.send(instance);
    instance.visitors = instance.visitors
      ? instance.visitors + 1
      : instance.__v + 1;
    await instance.save();
  }
  // else {
  //   // res.send(instance);
  //   Url.create({ url, linkUid, count: 1 });
  // }
  return instance;
};

export const handleRedirect = async (req, res) => {
  const route = req.params.route;
  const link = await getValue(route);

  if (!link) {
    const data = await Url.findOne({ id: route });
    if (data && !checkExpiration(data.expiration)) {
      res.redirect(`//${data.url}`);
    } else {
      res.send("Expired");
    }
  } else {
    res.redirect(`//${link}`);
  }

  const instance = await Url.findOne({ id: route });
  if (instance && !checkExpiration(instance.expiration)) {
    // res.send(instance);
    instance.visitors = instance.visitors
      ? instance.visitors + 1
      : instance.__v + 1;
    await instance.save();

    if (instance.visitors >= 10 && !link) {
      setValue(route, `//${instance.url}`);
    }
  }
};
