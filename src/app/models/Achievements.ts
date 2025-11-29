export interface Achievements {
    id: number;
    userId: number;
    filmTitle: string;
    year: number;
    category: string;
    event: string;
    eventLocation: string;
    verificationLink: string;
    createdAt: Date;
    updatedAt: Date;
}