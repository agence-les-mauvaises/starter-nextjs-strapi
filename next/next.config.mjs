const check = process.env.BUILD_CHECK === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: !check,
    },
    typescript: {
      ignoreBuildErrors: !check,
    },
    images: {
      remotePatterns: [{ hostname: process.env.IMAGE_HOSTNAME || new URL(process.env.NEXT_PUBLIC_API_URL).hostname }],
    },
    pageExtensions: ["ts", "tsx"],
    async redirects() {
      let redirections = [];
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/redirections`
        );
        const result = await res.json();
        const redirectItems = result.data.map(({ source, destination }) => {
          return {
            source: `/:locale${source}`,
            destination: `/:locale${destination}`,
            permanent: false,
          };
        });
  
        redirections = redirections.concat(redirectItems);
  
        return redirections;
      } catch (error) {
        return [];
      }
    },
  };
  
  export default nextConfig;
  