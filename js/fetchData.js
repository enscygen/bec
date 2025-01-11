const BASE_URL = "https://enscygen.github.io/bec/registry/";
const VERSION = "v1.1";
console.log(`BEC registry module ${VERSION}`);



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


async function fetchRegistryData() {
    const fileNames = ["F.json", "B.json", "P.json", "V.json"];
    const registryData = {};

    for (const fileName of fileNames) {
        registryData[fileName] = await fetchJSON(fileName);
    }

    return registryData;
}

// Search the registry for matches by BEC ID or organism name.
async function searchRegistry(query) {
    const registryData = await fetchRegistryData();
    const results = [];
    const lowerCaseQuery = query.toLowerCase();

    for (const [fileName, data] of Object.entries(registryData)) {
        results.push(
            ...data.filter(
                (item) =>
                    item.becId.toLowerCase().includes(lowerCaseQuery) || // Partial match for BEC ID
                    item.organismName.toLowerCase().includes(lowerCaseQuery) || // Partial match for organism name
                    (item.organismCommonName && item.organismCommonName.toLowerCase().includes(lowerCaseQuery)) // Partial match for common name, if it exists
            )
        );
    }

    return results;
}

export { fetchJSON, fetchRegistryData, searchRegistry };


export async function fetchOrganismDetails(becId) {
    // Extract the type from the BEC ID (e.g., 'F' for fungi, 'B' for bacteria, etc.)
    const type = becId.split('-')[0]; 

    // Build the URL to fetch the JSON file from the correct folder
    const url = `https://enscygen.github.io/bec/details/${type}/${becId}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Organism not found');
        }
        const data = await response.json();
        return data;  // Return the organism data
    } catch (error) {
        console.error('Error fetching BEC details:', error);
        return null;
    }
}
