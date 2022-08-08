export declare enum MissionType {
    STATIC = "static",
    FINITE = "finite",
    FINITE_G_TIME = "finitegtime",
    FINITE_G_STRIKES = "finitegstrikes",
    FINITE_G_TIME_STRIKES = "finitegtimestrikes"
}
export declare type NonEmptyArr<T> = [T, ...T[]];
export declare type MultiArr<T> = [T, ...NonEmptyArr<T>];
export declare type ElOrArr<T> = T | MultiArr<T>;
export declare type GTimeType = MissionType.FINITE_G_TIME | MissionType.FINITE_G_TIME_STRIKES;
export declare type NotGTimeType = Exclude<MissionType, GTimeType>;
export declare type GStrikesType = MissionType.FINITE_G_STRIKES | MissionType.FINITE_G_TIME_STRIKES;
export declare type NotGStrikesType = Exclude<MissionType, GStrikesType>;
export declare type ModulePool = ElOrArr<string> | [number, ...NonEmptyArr<string>];
export declare type BombInfo<TMissionType extends MissionType = MissionType> = TMissionType extends any ? {
    modules: NonEmptyArr<ModulePool>;
    widgets: number;
} & (TMissionType extends Exclude<MissionType, GTimeType> ? {
    time: number;
} : {}) & (TMissionType extends Exclude<MissionType, GStrikesType> ? {
    strikes: number;
} : {}) : never;
export declare enum CompletionType {
    TEAM = "team",
    EFM = "efm",
    SOLO = "solo"
}
export declare type CompletionVerification = {
    log: string;
} | {
    vid: ElOrArr<string>;
    log?: string;
} | {
    scr: string;
    log?: string;
} | {
    igl: true;
};
export declare type Completion<T extends CompletionType = CompletionType> = T extends any ? {
    time: number;
    isFirst?: true;
} & CompletionVerification & (T extends CompletionType.SOLO ? {
    type: T;
} : {
    type?: T;
}) & (T extends CompletionType.TEAM ? {
    completers: {
        defuser: string;
        experts: NonEmptyArr<string>;
    };
} : {
    completer: string;
}) : never;
export declare type MissionInfo<T extends MissionType = MissionType> = T extends any ? {
    name: string;
    author?: ElOrArr<string>;
    completions?: NonEmptyArr<Completion>;
    solvedByTP?: true;
    sortKey?: string;
    missionPack: string;
} & (T extends MissionType.STATIC ? {
    type?: T;
} & (BombInfo<T> | {
    bombs: MultiArr<BombInfo<T>>;
}) : {
    type: T;
    bombs: BombInfo<T>[];
} & (T extends GTimeType ? {
    time: number;
} : {}) & (T extends GStrikesType ? {
    strikes: number;
} : {})) : never;
export interface MissionPack {
    name: string;
    steamId: number;
    author: ElOrArr<string>;
}
