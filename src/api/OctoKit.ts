import { Octokit } from 'octokit';

const customOctokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_API_KEY,
});

export default customOctokit;
