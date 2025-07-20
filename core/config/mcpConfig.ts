/**
 * MCP Server Configuration
 * Manages integration with Model Context Protocol servers
 */

export interface MCPConfig {
  browserTools: {
    enabled: boolean;
    headless: boolean;
    timeout: number;
  };
  filesystem: {
    enabled: boolean;
    allowedPaths: string[];
  };
  fetch: {
    enabled: boolean;
    rateLimit: number;
    timeout: number;
  };
  braveSearch: {
    enabled: boolean;
    apiKey: string;
    maxResults: number;
  };
  memory: {
    enabled: boolean;
    maxEntries: number;
    ttl: number; // Time to live in seconds
  };
  sqlite: {
    enabled: boolean;
    dbPath: string;
  };
  git: {
    enabled: boolean;
    autoCommit: boolean;
  };
  puppeteer: {
    enabled: boolean;
    headless: boolean;
    executablePath?: string;
  };
}

export const mcpConfig: MCPConfig = {
  browserTools: {
    enabled: process.env.MCP_BROWSER_TOOLS_ENABLED === "true",
    headless: process.env.MCP_BROWSER_HEADLESS !== "false",
    timeout: parseInt(process.env.MCP_BROWSER_TIMEOUT || "30000", 10),
  },
  filesystem: {
    enabled: process.env.MCP_FILESYSTEM_ENABLED === "true",
    allowedPaths: (
      process.env.MCP_FILESYSTEM_ALLOWED_PATHS || "./data,./public"
    ).split(","),
  },
  fetch: {
    enabled: process.env.MCP_FETCH_ENABLED === "true",
    rateLimit: parseInt(process.env.MCP_FETCH_RATE_LIMIT || "10", 10),
    timeout: parseInt(process.env.MCP_FETCH_TIMEOUT || "10000", 10),
  },
  braveSearch: {
    enabled: process.env.MCP_BRAVE_SEARCH_ENABLED === "true",
    apiKey: process.env.MCP_BRAVE_SEARCH_API_KEY || "",
    maxResults: parseInt(process.env.MCP_BRAVE_SEARCH_MAX_RESULTS || "10", 10),
  },
  memory: {
    enabled: process.env.MCP_MEMORY_ENABLED === "true",
    maxEntries: parseInt(process.env.MCP_MEMORY_MAX_ENTRIES || "1000", 10),
    ttl: parseInt(process.env.MCP_MEMORY_TTL || "3600", 10),
  },
  sqlite: {
    enabled: process.env.MCP_SQLITE_ENABLED === "true",
    dbPath: process.env.MCP_SQLITE_DB_PATH || "./data/lotus.db",
  },
  git: {
    enabled: process.env.MCP_GIT_ENABLED === "true",
    autoCommit: process.env.MCP_GIT_AUTO_COMMIT === "true",
  },
  puppeteer: {
    enabled: process.env.MCP_PUPPETEER_ENABLED === "true",
    headless: process.env.MCP_PUPPETEER_HEADLESS !== "false",
    ...(process.env.MCP_PUPPETEER_EXECUTABLE_PATH && {
      executablePath: process.env.MCP_PUPPETEER_EXECUTABLE_PATH,
    }),
  },
};

// Validation function
export function validateMCPConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (mcpConfig.braveSearch.enabled && !mcpConfig.braveSearch.apiKey) {
    errors.push("Brave Search is enabled but API key is missing");
  }

  if (mcpConfig.sqlite.enabled && !mcpConfig.sqlite.dbPath) {
    errors.push("SQLite is enabled but database path is missing");
  }

  if (
    mcpConfig.filesystem.enabled &&
    mcpConfig.filesystem.allowedPaths.length === 0
  ) {
    errors.push("Filesystem is enabled but no allowed paths are configured");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
