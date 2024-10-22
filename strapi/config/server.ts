const stringIsAValidUrl = (s, protocols) => {
  try {
      const url = new URL(s);
      return protocols ? (url.protocol ? protocols.map((x) => `${x.toLowerCase()}:`).includes(url.protocol) : false) : true;
  } catch (err) {
      return false;
  }
};

export default ({ env }) => {
  const stringUrl = env('NEXT_PUBLIC_API_URL', 'http://localhost:1337');
  if (!stringIsAValidUrl(stringUrl, ['http', 'https'])) {
    throw new Error('The API URL is not a valid URL');
  }
  const url = new URL(stringUrl);
  
  return {
    
  host: url.hostname,
  port: url.port,
  app: {
    keys: env.array('APP_KEYS') || ["tobemodified1", "tobemodified2"],
  },
}};
