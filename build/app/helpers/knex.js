"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _knexfile = _interopRequireDefault(require("../../db/knexfile.js"));

var _config = require("../config.js");

var knex = (0, _knex["default"])(_knexfile["default"][_config.NODE_ENV || 'test']);
var DatabaseTest = {
  createDB: function createDB() {
    return knex.migrate.latest();
  },
  destroyDB: function destroyDB() {
    return knex.migrate.rollback(null, true);
  }
};
var _default = DatabaseTest;
exports["default"] = _default;
//# sourceMappingURL=knex.js.map