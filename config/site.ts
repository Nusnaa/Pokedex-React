export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Pokédex",
	navItems: [
		{
			label: "Frontpage",
			href: "/",
		},
		{
			label: "My Favourites",
			href: "/favourites",
		},
	],
};
