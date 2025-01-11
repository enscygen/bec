// fetchData.js

// Base URL of your GitHub Pages-hosted repository's JSON files
const BASE_URL = "https://enscygen.github.io/bec/registry/";

/**
 * Fetch and parse a JSON file from the registry folder.
 * @param {string} fileName - Name of the JSON file to fetch (e.g., "F.json").
 * @returns {Promise<Array>} - Parsed JSON data.
 */
async function fetchJSON(fileName) {
    try {
        const response = await fetch(`${BASE_URL}${fileName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching JSON:", error);
        return [];
    }
}

/**
 * Fetch all registry data from the JSON files.
 * @returns {Promise<Object>} - An object with data from all registry files.
 */
async function fetchRegistryData() {
    const fileNames = ["F.json", "B.json", "P.json", "V.json"]; // Add more file names as needed
    const registryData = {};

    for (const fileName of fileNames) {
        registryData[fileName] = await fetchJSON(fileName);
    }

    return registryData;
}

/**
 * Search the registry for matches by BEC ID or organism name.
 * @param {string} query - The BEC ID or partial organism name to search for.
 * @returns {Promise<Array>} - An array of matching organisms.
 */
async function searchRegistry(query) {
    const registryData = await fetchRegistryData();
    const results = [];
    const lowerCaseQuery = query.toLowerCase();

    for (const [fileName, data] of Object.entries(registryData)) {
        results.push(
            ...data.filter(
                (item) =>
                    item.becId.toLowerCase() === lowerCaseQuery || // Exact match for BEC ID
                    item.organismName.toLowerCase().includes(lowerCaseQuery) // Partial match for name
            )
        );
    }

    return results;
}

export { fetchJSON, fetchRegistryData, searchRegistry };
