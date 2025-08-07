// scripts/bootstrapWorkflow.js
const axios = require('axios');
const fs= require("fs");
const path =require("path");

const N8N_URL =  "http://n8n:5678";
const WORKFLOW_FILE = path.join(__dirname, "default-workflow.json");

async function bootstrapWorkflow() {
  try {
    const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, "utf8"));

    const existing = await axios.get(`${N8N_URL}/rest/workflows`);
    const alreadyExists = existing.data.some(w => w.name === workflow.name);
    if (alreadyExists) {
      console.log("✅ Workflow already exists in n8n.");
      return;
    }

    const response = await axios.post(`${N8N_URL}/rest/workflows`, workflow, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("✅ Workflow imported:", response.data.name);
  } catch (err) {
    console.error("❌ Workflow import failed:", err.message);
  }
}

bootstrapWorkflow();
