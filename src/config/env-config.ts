import path from "path";

// Determine the environment (e.g., 'development', 'test', 'production')
const environment = process.env.NODE_ENV || 'development';
console.log(`Environment: ${environment}`);

// Load environment variables based on the environment
const envFilePath = path.resolve('./', `.env.${environment}`);

export default envFilePath;