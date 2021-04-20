"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var UserSettingsValidator = {
  updateUserSettings: function updateUserSettings() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        user_settings_id: _joi["default"].string().required(),
        email_notification: _joi["default"].bool(),
        sms_notification: _joi["default"].bool(),
        device_notification: _joi["default"].bool(),
        device_notification_all_deals_and_promotions: _joi["default"].bool(),
        device_notification_special_offers_and_announcements: _joi["default"].bool(),
        device_notification_when_order_is_on_the_way: _joi["default"].bool(),
        device_notification_when_order_is_arriving: _joi["default"].bool(),
        device_notification_when_order_is_being_prepared: _joi["default"].bool()
      }
    });
  },
  createUserAddress: function createUserAddress() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        name: _joi["default"].string().required(),
        address: _joi["default"].string().required(),
        lat: _joi["default"].string().required(),
        lng: _joi["default"].string().required(),
        phone_number: _joi["default"].string().min(11).max(11),
        street_number: _joi["default"].string()
      }
    });
  },
  updateUserAddress: function updateUserAddress() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        user_saved_address_id: _joi["default"].string().required(),
        address: _joi["default"].string(),
        lat: _joi["default"].string(),
        lng: _joi["default"].string(),
        phone_number: _joi["default"].string().min(11).max(11),
        street_number: _joi["default"].string()
      }
    });
  },
  deleteUserAddress: function deleteUserAddress() {
    return (0, _middlewares.validationMiddleware)({
      params: {
        id: _joi["default"].string().required()
      }
    });
  }
};
var _default = UserSettingsValidator;
exports["default"] = _default;
//# sourceMappingURL=user-settings-validator.js.map