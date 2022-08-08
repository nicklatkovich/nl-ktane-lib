"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleters = exports.getMissionModules = exports.getPoolCount = exports.getPoolModules = exports.modulesPoolToModules = exports.isGlobalStrikes = exports.isGlobalTime = exports.getSolveType = exports.isEfmOrSoloSolve = exports.getMissionType = exports.modulePoolToModulesCount = exports.missionToBombs = exports.getMissionTime = exports.getMissionSolvers = exports.getMissionModulesCount = void 0;
const types_1 = require("./types");
function getMissionModulesCount(mission) {
    const bombs = missionToBombs(mission);
    let result = 0;
    for (const bomb of bombs) {
        for (const pool of bomb.modules)
            result += modulePoolToModulesCount(pool);
    }
    return result;
}
exports.getMissionModulesCount = getMissionModulesCount;
function getMissionSolvers(mission) {
    const res = new Set();
    for (const completion of mission.completions || []) {
        if (isEfmOrSoloSolve(completion))
            res.add(completion.completer);
        else {
            res.add(completion.completers.defuser);
            for (const expert of completion.completers.experts)
                res.add(expert);
        }
    }
    return res;
}
exports.getMissionSolvers = getMissionSolvers;
function getMissionTime(mission) {
    if (mission.type === types_1.MissionType.FINITE_G_TIME || mission.type === types_1.MissionType.FINITE_G_TIME_STRIKES) {
        return mission.time;
    }
    return missionToBombs(mission).reduce((res, { time }) => res + time, 0);
}
exports.getMissionTime = getMissionTime;
function missionToBombs(mission) {
    return mission.bombs || [mission];
}
exports.missionToBombs = missionToBombs;
function modulePoolToModulesCount(pool) {
    return typeof pool === "string" || typeof pool[0] !== "number" ? 1 : pool[0];
}
exports.modulePoolToModulesCount = modulePoolToModulesCount;
function getMissionType(mission) {
    return (mission.type ?? types_1.MissionType.STATIC);
}
exports.getMissionType = getMissionType;
function isEfmOrSoloSolve(completion) {
    return [types_1.CompletionType.EFM, types_1.CompletionType.SOLO].includes(getSolveType(completion));
}
exports.isEfmOrSoloSolve = isEfmOrSoloSolve;
function getSolveType(completion) {
    if (completion.type)
        return completion.type;
    return (completion.completer ? types_1.CompletionType.EFM : types_1.CompletionType.TEAM);
}
exports.getSolveType = getSolveType;
function isGlobalTime(mission) {
    return !!mission.type && [types_1.MissionType.FINITE_G_TIME, types_1.MissionType.FINITE_G_TIME_STRIKES].includes(mission.type);
}
exports.isGlobalTime = isGlobalTime;
function isGlobalStrikes(mission) {
    return !!mission.type && [types_1.MissionType.FINITE_G_STRIKES, types_1.MissionType.FINITE_G_TIME_STRIKES].includes(mission.type);
}
exports.isGlobalStrikes = isGlobalStrikes;
function modulesPoolToModules(pool) {
    if (typeof pool === "string")
        return new Set([pool]);
    if (typeof pool[0] === "string")
        return new Set(pool);
    return new Set(pool.slice(1));
}
exports.modulesPoolToModules = modulesPoolToModules;
function getPoolModules(pool) {
    if (typeof pool === "string")
        return [pool];
    if (typeof pool[0] === "string")
        return pool;
    return pool.slice(1);
}
exports.getPoolModules = getPoolModules;
function getPoolCount(pool) {
    if (Array.isArray(pool) && typeof pool[0] === "number")
        return pool[0];
    return 1;
}
exports.getPoolCount = getPoolCount;
function getMissionModules(mission) {
    const result = new Set();
    const bombs = missionToBombs(mission);
    for (const bomb of bombs) {
        for (const pool of bomb.modules) {
            for (const module of modulesPoolToModules(pool))
                result.add(module);
        }
    }
    return result;
}
exports.getMissionModules = getMissionModules;
function getCompleters(completion) {
    if (isEfmOrSoloSolve(completion))
        return [completion.completer];
    return [completion.completers.defuser, ...completion.completers.experts];
}
exports.getCompleters = getCompleters;
