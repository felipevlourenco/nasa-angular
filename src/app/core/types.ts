export interface ScoutResponse {
    signature: { version: string; source: string };
    count: string;
    data: ScoutObject[];
}

export interface ScoutObject {
    objectName: string;
    rating: number;
}
