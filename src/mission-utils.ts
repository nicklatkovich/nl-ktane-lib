import { BombInfo, Completion, CompletionType, GTimeType, MissionInfo, MissionType, ModulePool } from "./types";

export function getMissionModulesCount(mission: MissionInfo): number {
  const bombs = missionToBombs(mission);
  let result = 0;
  for (const bomb of bombs) {
    for (const pool of bomb.modules) result += modulePoolToModulesCount(pool);
  }
  return result;
}

export function getMissionSolvers(mission: MissionInfo): Set<string> {
  const res = new Set<string>();
  for (const completion of mission.completions || []) {
    if (isEfmOrSoloSolve(completion)) res.add(completion.completer);
    else {
      res.add(completion.completers.defuser);
      for (const expert of completion.completers.experts) res.add(expert);
    }
  }
  return res;
}

export function getMissionTime(mission: MissionInfo): number {
  if (mission.type === MissionType.FINITE_G_TIME || mission.type === MissionType.FINITE_G_TIME_STRIKES) {
    return mission.time;
  }
  return missionToBombs<Exclude<MissionType, GTimeType>>(mission).reduce((res, { time }) => res + time, 0);
}

export function missionToBombs<T extends MissionType = MissionType>(mission: MissionInfo<T>): BombInfo<T>[] {
  return (mission as any).bombs || [mission];
}

export function modulePoolToModulesCount(pool: ModulePool): number {
  return typeof pool === "string" || typeof pool[0] !== "number" ? 1 : pool[0];
}

export function getMissionType<T extends MissionType>(mission: MissionInfo<T>): T {
  return (mission.type ?? MissionType.STATIC) as T;
}

export function isEfmOrSoloSolve(
  completion: Completion,
): completion is Completion<CompletionType.SOLO | CompletionType.EFM> {
  return [CompletionType.EFM, CompletionType.SOLO].includes(getSolveType(completion));
}

export function getSolveType<T extends CompletionType = CompletionType>(completion: Completion<T>): T {
  if (completion.type) return completion.type as T;
  return ((completion as any).completer ? CompletionType.EFM : CompletionType.TEAM) as T;
}

export function isGlobalTime(
  mission: MissionInfo,
): mission is MissionInfo<MissionType.FINITE_G_TIME> | MissionInfo<MissionType.FINITE_G_TIME_STRIKES> {
  return !!mission.type && [MissionType.FINITE_G_TIME, MissionType.FINITE_G_TIME_STRIKES].includes(mission.type);
}

export function isGlobalStrikes(
  mission: MissionInfo,
): mission is MissionInfo<MissionType.FINITE_G_STRIKES> | MissionInfo<MissionType.FINITE_G_TIME_STRIKES> {
  return !!mission.type && [MissionType.FINITE_G_STRIKES, MissionType.FINITE_G_TIME_STRIKES].includes(mission.type);
}

export function modulesPoolToModules(pool: ModulePool): Set<string> {
  if (typeof pool === "string") return new Set([pool]);
  if (typeof pool[0] === "string") return new Set(pool as string[]);
  return new Set(pool.slice(1) as string[]);
}

export function getPoolModules(pool: ModulePool): string[] {
  if (typeof pool === "string") return [pool];
  if (typeof pool[0] === "string") return pool as string[];
  return pool.slice(1) as string[];
}

export function getPoolCount(pool: ModulePool): number {
  if (Array.isArray(pool) && typeof pool[0] === "number") return pool[0];
  return 1;
}

export function getMissionModules(mission: MissionInfo): Set<string> {
  const result = new Set<string>();
  const bombs = missionToBombs(mission);
  for (const bomb of bombs) {
    for (const pool of bomb.modules) {
      for (const module of modulesPoolToModules(pool)) result.add(module);
    }
  }
  return result;
}

export function getCompleters(completion: Completion): string[] {
  if (isEfmOrSoloSolve(completion)) return [completion.completer];
  return [completion.completers.defuser, ...completion.completers.experts];
}
