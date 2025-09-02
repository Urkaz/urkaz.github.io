const buildDate = new Date().toISOString();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    env: {
        NEXT_PUBLIC_BUILD_DATE: buildDate,
    },
};

export default nextConfig;
