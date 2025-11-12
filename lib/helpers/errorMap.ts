const ErrorDomains = ["githubApi", "userConfig", "server", "db"] as const;

type ErrorDomain = (typeof ErrorDomains)[number];

export type ErrorCodeMap = {
  [key: number]: string;
};

export type ErrorRegistry = {
  [key in ErrorDomain]: ErrorCodeMap;
};

const errorConfig: ErrorRegistry = {
  githubApi: {
    401: "The GitHub access token provided is invalid or unauthorized. Please check your token.",
    403: "GitHub Rate Limit Exceeded. You have made too many requests. Please wait a bit or provide a valid personal access token.",
    404: "GitHub User or Repository not found. Please double-check the username/repo path you entered.",
    500: "GitHub API encountered an internal server error. This is usually temporary.",
  },

  userConfig: {
    400: "Invalid Request: The username or configuration parameters provided are missing or malformed.",
    422: "Validation Error: The requested configuration (e.g., custom themes, filters) could not be processed due to invalid values.",
  },

  server: {
    500: "Internal Service Error: We encountered an unexpected error while processing your request. Please try again.",
    503: "Dependency Unavailable: An internal service (e.g., database or caching layer) is currently unreachable. Please try again shortly.",
  },

  db: {
    500: "Internal Database Error: WE encountered an unexpected error while processing your request. Please try again.",
  },
};

export default errorConfig;
