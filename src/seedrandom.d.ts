declare module "seedrandom" {
    export interface PRNG {
        (): number;
        double(): number;
        int32(): number;
        quick(): number;
    }

    export interface SeedRandomOptions {
        entropy?: boolean;
    }

    export default function seedrandom(
        seed?: string | number,
        options?: SeedRandomOptions
    ): PRNG;
}