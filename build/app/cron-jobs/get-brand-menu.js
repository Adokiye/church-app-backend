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

var jobEnvironment = {
  development: '* * * * *',
  production: '*/10 * * * *'
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
            _context.next = 85;
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
          _context.next = 82;
          break;

        case 16:
          //loop through response data
          menu_data = response.data;
          j = 0;

        case 18:
          if (!(j < menu_data.length)) {
            _context.next = 82;
            break;
          }

          // first check if category exists
          category_data = menu_data[j].category_data;
          super_meal_category = category_data.superCategory; // check if super meal category exists, if not create it

          _context.next = 23;
          return _supermeal_category["default"].query().findOne({
            'posist_data:_id': super_meal_category._id
          })["catch"](function () {
            return false;
          });

        case 23:
          superMealCategoryToCreate = _context.sent;
          console.log(superMealCategoryToCreate);

          if (!superMealCategoryToCreate) {
            _context.next = 31;
            break;
          }

          _context.next = 28;
          return _supermeal_category["default"].query().patchAndFetchById(superMealCategoryToCreate.id, {
            name: super_meal_category.superCategoryName,
            posist_data: super_meal_category
          });

        case 28:
          superMealCategoryToCreate = _context.sent;
          _context.next = 34;
          break;

        case 31:
          _context.next = 33;
          return _supermeal_category["default"].query().insert({
            posist_data: super_meal_category,
            name: super_meal_category.superCategoryName
          });

        case 33:
          superMealCategoryToCreate = _context.sent;

        case 34:
          _context.next = 36;
          return _meal_category["default"].query().findOne({
            'posist_data:_id': category_data._id
          })["catch"](function () {
            return false;
          });

        case 36:
          mealCategoryToCreate = _context.sent;
          console.log(mealCategoryToCreate);

          if (!mealCategoryToCreate) {
            _context.next = 44;
            break;
          }

          _context.next = 41;
          return _meal_category["default"].query().patchAndFetchById(mealCategoryToCreate.id, {
            name: category_data.categoryName,
            super_meal_category_id: superMealCategoryToCreate.id,
            posist_data: category_data
          });

        case 41:
          mealCategoryToCreate = _context.sent;
          _context.next = 47;
          break;

        case 44:
          _context.next = 46;
          return _meal_category["default"].query().insert({
            posist_data: category_data,
            name: category_data.categoryName,
            super_meal_category_id: superMealCategoryToCreate.id,
            meal_category_selection_type_id: meal_category_selection_types[0].id // set default meal category selection type

          });

        case 46:
          mealCategoryToCreate = _context.sent;

        case 47:
          _context.next = 49;
          return _meal["default"].query().findOne({
            'posist_data:_id': menu_data[j]._id
          })["catch"](function () {
            return false;
          });

        case 49:
          mealToCreate = _context.sent;
          console.log(mealToCreate);

          if (!mealToCreate) {
            _context.next = 57;
            break;
          }

          _context.next = 54;
          return _meal["default"].query().patchAndFetchById(mealToCreate.id, {
            name: menu_data[j].name,
            meal_category_id: mealCategoryToCreate.id,
            posist_data: menu_data[j],
            is_addon: menu_data[j].isAddOn,
            is_combo: menu_data[j].isCombo,
            preparation_time: menu_data[j].preparationTime.time.toString()
          });

        case 54:
          mealToCreate = _context.sent;
          _context.next = 60;
          break;

        case 57:
          _context.next = 59;
          return _meal["default"].query().insert({
            name: menu_data[j].name,
            meal_category_id: mealCategoryToCreate.id,
            posist_data: menu_data[j],
            is_addon: menu_data[j].isAddOn,
            is_combo: menu_data[j].isCombo,
            preparation_time: menu_data[j].preparationTime.time.toString()
          });

        case 59:
          mealToCreate = _context.sent;

        case 60:
          if (!(!menu_data[j].isAddOn && menu_data[j].mapItems.length > 0)) {
            _context.next = 79;
            break;
          }

          k = 0;

        case 62:
          if (!(k < menu_data[j].mapItems.length)) {
            _context.next = 79;
            break;
          }

          _context.next = 65;
          return _meal["default"].query().findOne({
            'posist_data:_id': menu_data[j].mapItems[k]._id
          })["catch"](function () {
            return false;
          });

        case 65:
          mealsAddonToCreate = _context.sent;
          addon = void 0;
          console.log(mealsAddonToCreate);

          if (!mealsAddonToCreate) {
            _context.next = 76;
            break;
          }

          _context.next = 71;
          return _addons["default"].query().findOne({
            meal_addon_id: mealsAddonToCreate.id,
            meal_id: mealToCreate.id
          })["catch"](function () {
            return false;
          });

        case 71:
          addon = _context.sent;

          if (addon) {
            _context.next = 76;
            break;
          }

          _context.next = 75;
          return _addons["default"].query().insert({
            meal_addon_id: mealsAddonToCreate.id,
            meal_id: mealToCreate.id
          });

        case 75:
          addon = _context.sent;

        case 76:
          k++;
          _context.next = 62;
          break;

        case 79:
          j++;
          _context.next = 18;
          break;

        case 82:
          i++;
          _context.next = 8;
          break;

        case 85:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));

var _default = job;
exports["default"] = _default;
//# sourceMappingURL=get-brand-menu.js.map