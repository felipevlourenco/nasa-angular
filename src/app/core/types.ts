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
}

export type ThreatLevel = 'High' | 'Medium' | 'Low';
