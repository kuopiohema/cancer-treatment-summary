export interface DrugEquivalence {
    drug: string;
    factor: number;
}

export interface DrugEquivalenceList {
    drugs: DrugEquivalence[];
    source: string;
}
