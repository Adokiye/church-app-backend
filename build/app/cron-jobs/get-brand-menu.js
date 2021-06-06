"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _brand = _interopRequireDefault(require("../models/brand"));

var _meal_category = _interopRequireDefault(require("../models/meal_category"));

var _supermeal_category = _interopRequireDefault(require("../models/supermeal_category"));

var _meal = _interopRequireDefault(require("../models/meal"));

var _addons = _interopRequireDefault(require("../models/addons"));

var _meal_category_selection_type = _interopRequireDefault(require("../models/meal_category_selection_type"));

var _config = require("../config");

var _helpers = require("../helpers");

var _objection = require("objection");

var jobEnvironment = {
  development: '*/3 * * * *',
  production: '*/3 * * * *'
};

var job = _nodeSchedule["default"].scheduleJob(jobEnvironment[_config.NODE_ENV], /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var brands, meal_category_selection_types, i, response, menu_data, j, category_data, super_meal_category, superMealCategoryToCreate, mealCategoryToCreate, mealToCreate, k, mealsAddonToCreate, addon;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Task: Updating BRAND MENU');
          _context.next = 3;
          return _brand["default"].query()["catch"](function (e) {
            return [];
          });

        case 3:
          brands = _context.sent;
          _context.next = 6;
          return _meal_category_selection_type["default"].query()["catch"](function (e) {
            return [];
          });

        case 6:
          meal_category_selection_types = _context.sent;
          i = 0;

        case 8:
          if (!(i < brands.length)) {
            _context.next = 95;
            break;
          }

          _context.next = 11;
          return (0, _helpers.getPosistBrandMenu)(brands[i].posist_data.customer_key);

        case 11:
          response = _context.sent;

          if (response.data) {
            _context.next = 16;
            break;
          }

          console.log(response);
          _context.next = 92;
          break;

        case 16:
          //loop through response data
          menu_data = response.data;
          j = 0;

        case 18:
          if (!(j < menu_data.length)) {
            _context.next = 92;
            break;
          }

          // first check if category exists
          category_data = menu_data[j].category;
          super_meal_category = category_data.superCategory; // check if super meal category exists, if not create it

          _context.t0 = console;
          _context.next = 24;
          return _supermeal_category["default"].query()["catch"](function (e) {
            return [];
          });

        case 24:
          _context.t1 = _context.sent;

          _context.t0.log.call(_context.t0, _context.t1);

          console.log(super_meal_category._id);
          _context.next = 29;
          return _supermeal_category["default"].query() // .findOne({
          //   'posist_data:_id': super_meal_category._id
          // })
          .where((0, _objection.ref)('super_meal_categories.posist_data:_id').castText(), super_meal_category._id)["catch"](function (e) {
            return [];
          });

        case 29:
          superMealCategoryToCreate = _context.sent;
          console.log(superMealCategoryToCreate);
          superMealCategoryToCreate = superMealCategoryToCreate.length > 0 ? superMealCategoryToCreate[0] : false;

          if (!superMealCategoryToCreate) {
            _context.next = 38;
            break;
          }

          _context.next = 35;
          return _supermeal_category["default"].query().patchAndFetchById(superMealCategoryToCreate.id, {
            name: super_meal_category.superCategoryName,
            posist_data: super_meal_category
          })["catch"](function (e) {
            return console.log(e);
          });

        case 35:
          superMealCategoryToCreate = _context.sent;
          _context.next = 41;
          break;

        case 38:
          _context.next = 40;
          return _supermeal_category["default"].query().insert({
            posist_data: super_meal_category,
            name: super_meal_category.superCategoryName
          })["catch"](function (e) {
            return console.log(e);
          });

        case 40:
          superMealCategoryToCreate = _context.sent;

        case 41:
          _context.next = 43;
          return _meal_category["default"].query() // .findOne({
          //   'posist_data:_id': category_data._id
          // })
          .where((0, _objection.ref)('meal_categories.posist_data:_id').castText(), category_data._id)["catch"](function () {
            return [];
          });

        case 43:
          mealCategoryToCreate = _context.sent;
          console.log(mealCategoryToCreate);
          mealCategoryToCreate = mealCategoryToCreate.length > 0 ? mealCategoryToCreate[0] : false;

          if (!mealCategoryToCreate) {
            _context.next = 52;
            break;
          }

          _context.next = 49;
          return _meal_category["default"].query().patchAndFetchById(mealCategoryToCreate.id, {
            name: category_data.categoryName,
            super_meal_category_id: superMealCategoryToCreate.id,
            posist_data: category_data
          })["catch"](function (e) {
            return console.log(e);
          });

        case 49:
          mealCategoryToCreate = _context.sent;
          _context.next = 55;
          break;

        case 52:
          _context.next = 54;
          return _meal_category["default"].query().insert({
            posist_data: category_data,
            name: category_data.categoryName,
            super_meal_category_id: superMealCategoryToCreate.id,
            meal_category_selection_type_id: meal_category_selection_types[0].id // set default meal category selection type

          })["catch"](function (e) {
            return console.log(e);
          });

        case 54:
          mealCategoryToCreate = _context.sent;

        case 55:
          _context.next = 57;
          return _meal["default"].query() // .findOne({
          //   'posist_data:_id': menu_data[j]._id
          // })
          .where((0, _objection.ref)('meals.posist_data:_id').castText(), menu_data[j]._id)["catch"](function () {
            return [];
          });

        case 57:
          mealToCreate = _context.sent;
          console.log(mealToCreate);
          mealToCreate = mealToCreate.length > 0 ? mealToCreate[0] : false;

          if (!mealToCreate) {
            _context.next = 66;
            break;
          }

          _context.next = 63;
          return _meal["default"].query().patchAndFetchById(mealToCreate.id, {
            name: menu_data[j].name,
            meal_category_id: mealCategoryToCreate.id,
            posist_data: menu_data[j],
            amount: menu_data[j].rate.toString(),
            is_addon: menu_data[j].isAddOn,
            is_combo: menu_data[j].isCombo,
            brand_id: brands[i].id,
            preparation_time: menu_data[j].preparationTime.time.toString()
          })["catch"](function (e) {
            return console.log(e);
          });

        case 63:
          mealToCreate = _context.sent;
          _context.next = 69;
          break;

        case 66:
          _context.next = 68;
          return _meal["default"].query().insert({
            name: menu_data[j].name,
            meal_category_id: mealCategoryToCreate.id,
            amount: menu_data[j].rate.toString(),
            brand_id: brands[i].id,
            posist_data: menu_data[j],
            is_addon: menu_data[j].isAddOn,
            is_combo: menu_data[j].isCombo,
            preparation_time: menu_data[j].preparationTime.time.toString()
          })["catch"](function (e) {
            return console.log(e);
          });

        case 68:
          mealToCreate = _context.sent;

        case 69:
          if (!(!menu_data[j].isAddOn && menu_data[j].mapItems && menu_data[j].mapItems.length > 0)) {
            _context.next = 89;
            break;
          }

          k = 0;

        case 71:
          if (!(k < menu_data[j].mapItems.length)) {
            _context.next = 89;
            break;
          }

          _context.next = 74;
          return _meal["default"].query() // .findOne({
          //   'posist_data:_id': menu_data[j].mapItems[k]._id
          // })
          .where((0, _objection.ref)('meals.posist_data:_id').castText(), menu_data[j].mapItems[k]._id)["catch"](function () {
            return [];
          });

        case 74:
          mealsAddonToCreate = _context.sent;
          addon = void 0;
          console.log(mealsAddonToCreate);
          mealsAddonToCreate = mealsAddonToCreate.length > 0 ? mealsAddonToCreate[0] : false;

          if (!mealsAddonToCreate) {
            _context.next = 86;
            break;
          }

          _context.next = 81;
          return _addons["default"].query().findOne({
            meal_addon_id: mealsAddonToCreate.id,
            meal_id: mealToCreate.id
          })["catch"](function () {
            return false;
          });

        case 81:
          addon = _context.sent;

          if (addon) {
            _context.next = 86;
            break;
          }

          _context.next = 85;
          return _addons["default"].query().insert({
            meal_addon_id: mealsAddonToCreate.id,
            meal_id: mealToCreate.id
          })["catch"](function (e) {
            return console.log(e);
          });

        case 85:
          addon = _context.sent;

        case 86:
          k++;
          _context.next = 71;
          break;

        case 89:
          j++;
          _context.next = 18;
          break;

        case 92:
          i++;
          _context.next = 8;
          break;

        case 95:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));

var _default = job;
exports["default"] = _default;
//# sourceMappingURL=get-brand-menu.js.map