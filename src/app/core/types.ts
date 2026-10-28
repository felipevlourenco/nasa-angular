export interface ScoutResponse {
    signature: { version: string; source: string };
    count: string;
    data: ScoutObject[];
}

export interface ScoutObject {
    objectName: string;
    H: string;
    nObs: number;
    caDist?: string | null;
    neoScore: number;
    phaScore: number;
    lastRun: string;
    rating: number | null;
    moid: string;
    Vmag: string;
    rmsN: string;
    unc: string;
    uncP1: string;
    arc: string;
    rate: string;
    ra: string;
    dec: string;
    elong: string;
    tEphem: string;
    vInf?: string | null;
    tisserandScore: number;
    ieoScore: number;
    neo1kmScore: number;
    geocentricScore: number;
}

export type ThreatLevel = 'High' | 'Medium' | 'Low';
