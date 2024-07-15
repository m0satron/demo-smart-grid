<template>
  <div>
    <button @click="loadCSVFile">Load CSV Files</button>
    <div v-if="parsedData.length">
      <h3>Parsed Data</h3>
      <ul>
        <li v-for="(row, index) in parsedData" :key="index">
          {{ row }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from 'papaparse';

const parsedData = ref([]);

const props = defineProps<{
  columnsToExtract: string[];
  fileName: string;
}>()

const loadCSVFile = async () => {
    const filePath = require(`@/assets/data/${fileName}`);
    const response = await fetch(filePath);
    const csvText = await response.text();
    parseCSV(csvText);
};

const parseCSV = (csvText) => {
  Papa.parse(csvText, {
    header: true,
    complete: results => extractColumns(results.data),
    error: error => console.error('Error parsing CSV:', error)
  });
};

const extractColumns = (data) => {
  if (!props.columnsToExtract) 
    return console.error('Please provide columnsToExtract prop');

  const extractedData = data.map((row) => {
    const extractedRow = {};
    props.columnsToExtract.forEach((col) => {
      extractedRow[col] = row[col];
    });
    return extractedRow;
  });
  parsedData.value = [...paresedData.value, ...extractedData];
};

defineExpose({
  parsedData,
});

</script>
