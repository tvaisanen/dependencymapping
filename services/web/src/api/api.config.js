const paths = {
    mappings: '/mappings',
}
const MAPPINGS = '/mappings';

const DEV_DOMAIN = "http://127.0.0.1:8000";

export const devPaths = {
    mappings: () => `${DEV_DOMAIN}${MAPPINGS}`
}