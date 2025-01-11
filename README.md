<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bio Entity Catalogue (BEC) - README</title>
</head>
<body>

    <h1>Bio Entity Catalogue (BEC)</h1>

    <p>The <strong>Bio Entity Catalogue (BEC)</strong> is a comprehensive database designed to store and retrieve details of biological organisms, including fungi, bacteria, viruses, plants, and other life forms. This repository hosts the data in JSON format and provides a JavaScript module that allows users to search and retrieve organism information via <strong>BEC ID</strong> or <strong>organism name</strong>.</p>

    <p>This project is part of <strong>Enscygen</strong>, which is committed to advancing the field of bioinformatics and helping researchers, scientists, and others access essential biological data.</p>

    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#repository-structure">Repository Structure</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#search-functionality">Search Functionality</a></li>
        <li><a href="#how-to-use">How to Use</a></li>
        <li><a href="#example-files">Example Files</a></li>
        <li><a href="#integration-example">Integration Example</a></li>
        <li><a href="#version">Version</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ul>

    <h2 id="repository-structure">Repository Structure</h2>
    <pre>
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
    </pre>

    <p>- <strong>/registry</strong>: Contains JSON files for different types of organisms (e.g., <code>F.json</code> for fungi, <code>B.json</code> for bacteria, <code>P.json</code> for plants, <code>V.json</code> for viruses). Each file contains an array of organisms, where each organism has details like <strong>BEC ID</strong>, <strong>organism name</strong>, <strong>type</strong>, and <strong>description</strong>.</p>
    <p>- <strong>/js</strong>: Contains JavaScript files such as <code>fetchData.js</code>, which handles fetching and searching the registry data.</p>
    <p>- <strong>/index.html</strong>: A sample HTML page demonstrating how to use the search functionality on a web page.</p>

    <h2 id="how-it-works">How It Works</h2>
    <p>The <strong>Bio Entity Catalogue</strong> allows you to:</p>
    <ol>
        <li>Store biological organism data in JSON format for various categories like <strong>Fungi</strong>, <strong>Bacteria</strong>, <strong>Viruses</strong>, <strong>Plants</strong>, and more.</li>
        <li>Use the provided JavaScript module (<code>fetchData.js</code>) to <strong>search</strong> for organisms by their <strong>BEC ID</strong> or <strong>organism name</strong>.</li>
        <li>Retrieve results from a web page in real-time by integrating the <code>fetchData.js</code> module.</li>
    </ol>

    <h3>Data Format</h3>
    <p>Each organism entry follows this structure:</p>
    <pre>
{
  "becId": "V-10001-21-1",
  "organismName": "Adenovirus",
  "type": "Virus",
  "description": "Adenoviruses are medium-sized, non-enveloped viruses with a double-stranded DNA genome."
}
    </pre>
    <ul>
        <li><strong>becId</strong>: The unique identifier for the organism.</li>
        <li><strong>organismName</strong>: The scientific name of the organism.</li>
        <li><strong>type</strong>: The type of organism (e.g., Virus, Bacteria, Plant).</li>
        <li><strong>description</strong>: A brief description of the organism.</li>
    </ul>

    <h2 id="search-functionality">Search Functionality</h2>
    <p>The search functionality allows users to search for organisms by entering a <strong>BEC ID</strong> or <strong>organism name</strong>. The search is case-insensitive and supports partial matching.</p>

    <h3>How It Works:</h3>
    <p>When a user types into the search bar, the input is compared against the <strong>BEC ID</strong> and <strong>organism name</strong> fields from the JSON files in the <code>/registry</code> folder. The results are displayed dynamically on the web page.</p>

    <h2 id="how-to-use">How to Use</h2>

    <h3>1. Clone the Repository</h3>
    <pre>git clone https://github.com/enscygen/bec.git</pre>

    <h3>2. Deploy on Your Web Page</h3>
    <p>You can use the <strong>BEC registry module</strong> (<code>fetchData.js</code>) and search functionality in any HTML page by following these steps:</p>
    <ol>
        <li><strong>Include the JavaScript Module</strong>: Add the following script tag to your HTML page to load the <code>fetchData.js</code> module:</li>
        <pre>
<script type="module" src="https://enscygen.github.io/bec/js/fetchData.js"></script>
        </pre>

        <li><strong>Add the Search Box and Display Results</strong>: Include an input field for the search query and a container for displaying results in your HTML page:</li>
        <pre>
<input type="text" id="search-input" placeholder="Enter BEC ID or Organism Name..." />
<div class="results" id="results"></div>
        </pre>

        <li><strong>Initialize Search</strong>: Use the following script to implement the search functionality in your page:</li>
        <pre>
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
        resultItem.innerHTML = \`
            <h3>\${item.organismName}</h3>
            <p><strong>BEC ID:</strong> \${item.becId}</p>
            <p><strong>Type:</strong> \${item.type}</p>
            <p>\${item.description}</p>
        \`;
        resultsContainer.appendChild(resultItem);
    });
}
        </pre>
    </ol>

    <h2 id="example-files">Example Files</h2>

    <h3>1. <code>F.json</code> (Fungi)</h3>
    <pre>
[
    {
        "becId": "F-10982-23-2",
        "organismName": "Saccharomyces cerevisiae",
        "type": "Fungus",
        "description": "A widely studied yeast used in baking and brewing."
    }
]
    </pre>

    <h3>2. <code>B.json</code> (Bacteria)</h3>
    <pre>
[
    {
        "becId": "B-20001-15-2",
        "organismName": "Escherichia coli",
        "type": "Bacteria",
        "description": "A common bacterium found in the intestines of warm-blooded organisms."
    }
]
    </pre>

    <h3>3. <code>P.json</code> (Plants)</h3>
    <pre>
[
    {
        "becId": "P-30001-10-3",
        "organismName": "Arabidopsis thaliana",
        "type": "Plant",
        "description": "A small flowering plant used in plant research."
    }
]
    </pre>

    <h2 id="integration-example">Integration Example</h2>
    <p>If you'd like to use the BEC registry on your own website, you can follow the instructions above to integrate the <strong><code>fetchData.js</code></strong> module. Here's a simple <strong>HTML page</strong> that uses the module:</p>
    <pre>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEC Search</title>
    <script type="module" src="https://enscygen.github.io/bec/js/fetchData.js"></script>
</head>
<body>
    <h1>BEC Search</h1>
    <input type="text" id="search-input" placeholder="Enter BEC ID or Organism Name..." />
    <div class="results" id="results"></div>

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
                resultItem.innerHTML = \`
                    <h3>\${item.organismName}</h3>
                    <p><strong>BEC ID:</strong> \${item.becId}</p>
                    <p><strong>Type:</strong> \${item.type}</p>
                    <p>\${item.description}</p>
                \`;
                resultsContainer.appendChild(resultItem);
            });
        }
    </script>
</body>
</html>
    </pre>

    <h2 id="version">Version</h2>
    <p><strong>Current Version</strong>: <code>v1.1</code></p>
    <p><strong>Changes in v1.1</strong>: Added functionality to search by both <strong>BEC ID</strong> and <strong>organism name</strong>.</p>

    <h2 id="contributing">Contributing</h2>
    <p>If you'd like to contribute to the <strong>Bio Entity Catalogue</strong>, feel free to submit a pull request or open an issue with suggestions or bug reports. We welcome contributions from the community!</p>

    <h2 id="license">License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
