const production = import.meta.env.PROD
const dominio = production ? window.location.origin : 'https://api.escuelajs.co'
export const API_URL = `${dominio}/api/v1`
