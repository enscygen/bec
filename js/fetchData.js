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
                    item.organismName.toLowerCase().includes(lowerCaseQuery) // Partial match for name
            )
        );
    }

    return results;
}

export { fetchJSON, fetchRegistryData, searchRegistry };
