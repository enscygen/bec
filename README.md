Bio Entity Catalogue (BEC)

The Enscygen's Bio Entity Catalogue (BEC) is a repository for storing information about biological organisms like fungi, bacteria, viruses, plants, etc. This project includes a set of JSON files and a JavaScript module that allows users to search and retrieve organism data by BEC ID or organism name.

Repository Structure

/bec
  /registry
    - F.json
    - B.json
    - P.json
    - V.json
    - ... (additional organism files)
  /js
    - fetchData.js
  /index.html

How to Use

To use the BEC registry and search for organisms on your website, follow these steps:

1. Include the JavaScript Module

In your HTML page, include the fetchData.js module using the following script tag:

<script type="module" src="https://enscygen.github.io/bec/js/fetchData.js"></script>

2. Create a Search Box and Display Area

Add an input field for users to type their search query (either BEC ID or organism name) and a container to display the search results:

<input type="text" id="search-input" placeholder="Enter BEC ID or Organism Name..." />
<div class="results" id="results"></div>

3. Initialize the Search Function

Use the following script to initialize the search functionality:

<script type="module">
  import { searchRegistry } from 'https://enscygen.github.io/bec/js/fetchData.js';

  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results');

  searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (query.length > 0) {
      const results = await searchRegistry(query);
      renderResults(results);
    } else {
      resultsContainer.innerHTML = '';
    }
  });

  function renderResults(results) {
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
    results.forEach(item => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.innerHTML = `
        <h3>${item.organismName}</h3>
        <p><strong>BEC ID:</strong> ${item.becId}</p>
        <p><strong>Type:</strong> ${item.type}</p>
        <p>${item.description}</p>
      `;
      resultsContainer.appendChild(resultItem);
    });
  }
</script>

4. Example of Organism Data (in JSON files)

Each organism file in the /registry folder contains an array of objects. Here’s an example:

F.json (Fungi)
[
  {
    "becId": "F-10982-23-2",
    "organismName": "Saccharomyces cerevisiae",
    "type": "Fungus",
    "description": "A widely studied yeast used in baking and brewing."
  }
]

B.json (Bacteria)
[
  {
    "becId": "B-20001-15-2",
    "organismName": "Escherichia coli",
    "type": "Bacteria",
    "description": "A common bacterium found in the intestines of warm-blooded organisms."
  }
]

5. Version

- Current Version: v1.1
- Changes in v1.1: Added functionality to search by both BEC ID and organism name.

License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For any issues or contributions, please feel free to open an issue or submit a pull request!
