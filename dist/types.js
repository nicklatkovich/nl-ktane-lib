"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionType = exports.MissionType = void 0;
var MissionType;
(function (MissionType) {
    MissionType["STATIC"] = "static";
    MissionType["FINITE"] = "finite";
    MissionType["FINITE_G_TIME"] = "finitegtime";
    MissionType["FINITE_G_STRIKES"] = "finitegstrikes";
    MissionType["FINITE_G_TIME_STRIKES"] = "finitegtimestrikes";
})(MissionType = exports.MissionType || (exports.MissionType = {}));
var CompletionType;
(function (CompletionType) {
    CompletionType["TEAM"] = "team";
    CompletionType["EFM"] = "efm";
    CompletionType["SOLO"] = "solo";
})(CompletionType = exports.CompletionType || (exports.CompletionType = {}));
