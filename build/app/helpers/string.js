"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCode = void 0;

var makeCode = function makeCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

exports.makeCode = makeCode;
//# sourceMappingURL=string.js.map