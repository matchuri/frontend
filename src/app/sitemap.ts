import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: "https://www.matchuri.com/" },
        { url: "https://www.matchuri.com/guest-recommendation" },
    ];
}
