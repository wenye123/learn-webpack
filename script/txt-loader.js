const { validate } = require("schema-utils");

const schema = require("./options.json");

module.exports.default = function TxtLoader(source) {
  const options = { esModule: false };

  validate(schema, options, {
    name: "Raw Loader",
    baseDataPath: "options",
  });

  const json = JSON.stringify(source)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  const esModule = typeof options.esModule !== "undefined" ? options.esModule : true;

  return `${esModule ? "export default" : "module.exports ="} ${json};`;
};
