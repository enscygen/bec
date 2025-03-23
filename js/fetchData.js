const BASE_URL = "https://enscygen.github.io/bec/registry/";
const DETAILS_URL = "https://enscygen.github.io/bec/details/";
const REDIRECTS_URL = "https://enscygen.github.io/bec/registry/redirects.json";  
const VERSION = "v1.1";

console.log(`BEC registry module ${VERSION}`);

export { VERSION };

// Function to fetch JSON from a given URL
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching JSON:", error);
        return null;
    }
}

// Fetch registry data
async function fetchRegistryData() {
    const fileNames = ["F.json", "B.json", "P.json", "V.json"];
    const registryData = {};

    for (const fileName of fileNames) {
        registryData[fileName] = await fetchJSON(`${BASE_URL}${fileName}`);
    }

    return registryData;
}

// Search function for registry
async function searchRegistry(query) {
    const registryData = await fetchRegistryData();
    const results = [];
    const lowerCaseQuery = query.toLowerCase();

    for (const [fileName, data] of Object.entries(registryData)) {
        results.push(
            ...data.filter(
                (item) =>
                    item.becId.toLowerCase().includes(lowerCaseQuery) ||
                    item.organismName.toLowerCase().includes(lowerCaseQuery) ||
                    (item.organismCommonName && item.organismCommonName.toLowerCase().includes(lowerCaseQuery))
            )
        );
    }

    return results;
}

export { fetchJSON, fetchRegistryData, searchRegistry };

export async function fetchOrganismDetails(becId) {
    const type = becId.split('-')[0]; 
    const url = `${DETAILS_URL}${type}/${becId}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Organism not found: ${becId}`);
        }
        const organismDetails = await response.json();
        return { organismDetails, redirectedBECId: null }; // No redirection happened
    } catch (error) {
        console.warn(`BEC ID ${becId} not found. Checking for redirection...`);

        // Check for redirection
        const redirectedBECId = await fetchRedirectedBEC(becId);
        if (redirectedBECId) {
            console.log(`Redirecting ${becId} to ${redirectedBECId}`);
            const redirectedData = await fetchOrganismDetails(redirectedBECId);
            return { 
                organismDetails: redirectedData.organismDetails, 
                redirectedBECId 
            };
        }

        console.error(`No redirection found for ${becId}`);
        return { organismDetails: null, redirectedBECId: null }; // No data found
    }
}


// Function to check if a BEC ID has a redirection
async function fetchRedirectedBEC(becId) {
    try {
        const redirects = await fetchJSON(REDIRECTS_URL);
        return redirects && redirects[becId] ? redirects[becId] : null;
    } catch (error) {
        console.error("Error fetching redirect data:", error);
        return null;
    }
}
