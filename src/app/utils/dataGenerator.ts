import { Faker, fakerEN_US, fakerDE, fakerAR } from "@faker-js/faker";
import seedrandom from "seedrandom";

// Define the structure for the Book interface
export interface Book {
    index: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    likes: number;
    reviews: number;
}

// Define the type for locales
const locales: Record<"en-US" | "de-DE" | "ar", Faker> = {
    "en-US": fakerEN_US, // English (USA)
    "de-DE": fakerDE,    // German (Germany)
    "ar": fakerAR,       // Arabic (Arabic)
};

// Function to capitalize the first letter of each word in a sentence
const capitalizeSentence = (sentence: string): string => {
    return sentence
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

// Generate books dynamically based on input parameters
export const generateBooks = (
    seed: number, // Seed value for deterministic generation
    language: "en-US" | "de-DE" | "ar", // Locale (e.g., 'en-US', 'de-DE', 'ar')
    region: string, // Region context (not used directly)
    likes: number, // Average likes per book
    reviews: number, // Average reviews per book
    page: number // Page number for batch generation
): Book[] => {
    const rng = seedrandom(String(seed + page)); // Seed RNG for deterministic results

    // Ensure the faker instance for the given language exists
    const localizedFaker = locales[language] || fakerEN_US; // Fallback to English

    // Seed Faker instance for consistent results
    localizedFaker.seed(Math.floor(rng() * 100000));

    // return Array.from({ length: 20 }, (_, i) => {
    //     // Generate a consistent title
    //     const titleSeeded = seed + page + i + 200; // Ensure title seed consistency
    //     localizedFaker.seed(titleSeeded);
    //     const titleWordCount = Math.floor(rng() * 5) + 1; // Random word count (1-5)
    //     const title = capitalizeSentence(localizedFaker.word.words(titleWordCount));
    //
    //     // Generate a consistent author
    //     const authorSeeded = seed + page + i; // Ensure author seed consistency
    //     localizedFaker.seed(authorSeeded);
    //     const author = localizedFaker.person.fullName();
    //
    //     // Generate a consistent publisher
    //     const publisherSeeded = seed + page + i + 100; // Ensure publisher seed consistency
    //     localizedFaker.seed(publisherSeeded);
    //     const publisher = localizedFaker.company.name();
    //
    //     return {
    //         index: i + 1 + (page - 1) * 20, // Sequential index
    //         isbn: localizedFaker.string.numeric(13), // 13-digit numeric ISBN
    //         title, // Consistent, localized title
    //         author, // Consistent, localized author
    //         publisher, // Consistent, localized publisher
    //         likes: Math.floor(rng() * likes), // Randomized likes
    //         reviews: Math.floor(rng() * reviews), // Randomized reviews
    //     };
    // });

    return Array.from({ length: 20 }, (_, i) => {
        const wordCount = Math.floor(rng() * 5) + 1; // Random word count (1-5)

        // Generate titles based on the selected language
        const title =
            language === "ar"
                ? localizedFaker.lorem.words(wordCount) // Arabic title using lorem
                : language === "de-DE"
                    ? localizedFaker.lorem.words(wordCount) // German title using lorem
                    : localizedFaker.lorem.words(wordCount); // English title using lorem (default)

        // Generate consistent author and publisher
        const authorSeeded = seed + page + i;
        localizedFaker.seed(authorSeeded);
        const author = localizedFaker.person.fullName();

        const publisherSeeded = seed + page + i + 100;
        localizedFaker.seed(publisherSeeded);
        const publisher = localizedFaker.company.name();

        return {
            index: i + 1 + (page - 1) * 20, // Sequential index
            isbn: localizedFaker.string.numeric(13), // 13-digit numeric ISBN
            title: capitalizeSentence(title), // Capitalized title
            author, // Consistent author
            publisher, // Consistent publisher
            likes: Math.floor(rng() * likes), // Randomized likes
            reviews: Math.floor(rng() * reviews), // Randomized reviews
        };
    });
};

// import { Faker, fakerEN_US, fakerDE, fakerRU } from "@faker-js/faker";
// import seedrandom from "seedrandom";
//
// // Define the structure for the Book interface
// export interface Book {
//     index: number;
//     isbn: string;
//     title: string;
//     author: string;
//     publisher: string;
//     likes: number;
//     reviews: number;
// }
//
// // Define the type for locales
// const locales: Record<"en-US" | "de-DE" | "ru", Faker> = {
//     "en-US": fakerEN_US, // English (USA)
//     "de-DE": fakerDE,    // German (Germany)
//     "ru": fakerRU,       // Russian (Russia)
// };
//
// // Function to capitalize the first letter of each word in a sentence
// const capitalizeSentence = (sentence: string): string => {
//     return sentence
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
// };
//
// // Generate books dynamically based on input parameters
// export const generateBooks = (
//     seed: number, // Seed value for deterministic generation
//     language: "en-US" | "de-DE" | "ru", // Locale (e.g., 'en-US', 'de-DE', 'ru')
//     region: string, // Region context (not used directly)
//     likes: number, // Average likes per book
//     reviews: number, // Average reviews per book
//     page: number // Page number for batch generation
// ): Book[] => {
//     const rng = seedrandom(String(seed + page)); // Seed RNG for deterministic results
//
//     // Ensure the faker instance for the given language exists
//     const localizedFaker = locales[language] || fakerEN_US; // Fallback to English
//
//     // Seed Faker instance for consistent results
//     localizedFaker.seed(Math.floor(rng() * 100000));
//
//     return Array.from({ length: 20 }, (_, i) => {
//         // Generate a consistent title
//         const titleSeeded = seed + page + i + 200; // Ensure title seed consistency
//         localizedFaker.seed(titleSeeded);
//
//         let title: string;
//         try {
//             title = capitalizeSentence(localizedFaker.word.words(Math.floor(rng() * 5) + 1)); // Preferred localized function
//         } catch {
//             // Fallback to lorem.words if localized "words" is unavailable
//             title = capitalizeSentence(localizedFaker.lorem.words(Math.floor(rng() * 5) + 1));
//         }
//
//         // Generate a consistent author
//         const authorSeeded = seed + page + i; // Ensure author seed consistency
//         localizedFaker.seed(authorSeeded);
//         const author = localizedFaker.person.fullName();
//
//         // Generate a consistent publisher
//         const publisherSeeded = seed + page + i + 100; // Ensure publisher seed consistency
//         localizedFaker.seed(publisherSeeded);
//         const publisher = localizedFaker.company.name();
//
//         return {
//             index: i + 1 + (page - 1) * 20, // Sequential index
//             isbn: localizedFaker.string.numeric(13), // 13-digit numeric ISBN
//             title, // Consistent, localized title
//             author, // Consistent, localized author
//             publisher, // Consistent, localized publisher
//             likes: Math.floor(rng() * likes), // Randomized likes
//             reviews: Math.floor(rng() * reviews), // Randomized reviews
//         };
//     });
// };