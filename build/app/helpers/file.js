"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTempFileStorage = exports.deleteFile = exports.readFileFrom = exports.saveFileTo = exports.writeFile = exports.nameToUrl = exports.fileToBlob = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mv = _interopRequireDefault(require("mv"));

var _xhr = _interopRequireDefault(require("xhr2"));

global.XMLHttpRequest = _xhr["default"];

var fileToBlob = function fileToBlob(file) {
  return new Promise(function (resolve, reject) {
    _fs["default"].readFile(file.path, function (err, data) {
      if (err) {
        reject(err);
      }

      _fs["default"].unlinkSync(file.path);

      resolve(data);
    });
  });
};

exports.fileToBlob = fileToBlob;

var nameToUrl = function nameToUrl(filename) {
  var split = filename.split('.');
  var name = split.slice(0, split.length - 1).join('.');
  return "".concat(name, "_").concat(Date.now(), ".").concat(split[split.length - 1]);
};

exports.nameToUrl = nameToUrl;

var writeFile = function writeFile(file) {
  return new Promise(function (resolve, reject) {
    file.on('error', function (err) {
      return reject(err);
    }).on('finish', function () {
      return resolve(file);
    });
  });
};

exports.writeFile = writeFile;

var saveFileTo = function saveFileTo(_ref) {
  var file = _ref.file,
      _ref$dir = _ref.dir,
      dir = _ref$dir === void 0 ? 'files' : _ref$dir,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '' : _ref$prefix;
  return new Promise(function (resolve, reject) {
    var newFileName = prefix.length ? "".concat(prefix, ".").concat(file.name) : "".concat(file.name);
    var newPath = "".concat(process.cwd(), "/src/").concat(dir, "/").concat(newFileName);
    (0, _mv["default"])(file.path, newPath, function (err) {
      if (err) {
        reject(err);
      }

      resolve({
        size: file.size,
        path: newPath,
        name: newFileName,
        type: file.type,
        mtime: file.lastModifiedDate
      });
    });
  });
};

exports.saveFileTo = saveFileTo;

var readFileFrom = function readFileFrom(_ref2) {
  var file = _ref2.file,
      _ref2$dir = _ref2.dir,
      dir = _ref2$dir === void 0 ? 'files' : _ref2$dir,
      _ref2$stream = _ref2.stream,
      stream = _ref2$stream === void 0 ? false : _ref2$stream,
      _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? {} : _ref2$options;
  return new Promise(function (resolve, reject) {
    var filepath = "".concat(process.cwd(), "/src/").concat(dir, "/").concat(file);

    if (stream) {
      resolve(_fs["default"].createReadStream(filepath, options));
    } else {
      _fs["default"].readFile(filepath, options, function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    }
  });
};

exports.readFileFrom = readFileFrom;

var deleteFile = function deleteFile(_ref3) {
  var file = _ref3.file,
      _ref3$dir = _ref3.dir,
      dir = _ref3$dir === void 0 ? 'files' : _ref3$dir;
  return new Promise(function (resolve, reject) {
    var filepath = "".concat(process.cwd(), "/src/").concat(dir, "/").concat(file);

    _fs["default"].unlink(filepath, function (err, data) {
      if (err) {
        reject(err);
      }

      console.log(file, 'deleted from ', dir);
      resolve(data);
    });
  });
};

exports.deleteFile = deleteFile;

var createTempFileStorage = function createTempFileStorage(_ref4) {
  var dirname = _ref4.dirname;
  var dir = "".concat(_path["default"].dirname(__dirname), "/").concat(dirname);

  if (!_fs["default"].existsSync(dir)) {
    _fs["default"].mkdirSync(dir);
  }
};

exports.createTempFileStorage = createTempFileStorage;
//# sourceMappingURL=file.js.map