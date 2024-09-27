import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
	const [wishlist, setWishlist] = useState(() => {
		const savedWishlist = localStorage.getItem("wishlist");
		return savedWishlist ? JSON.parse(savedWishlist) : [];
	});

	useEffect(() => {
		localStorage.setItem("wishlist", JSON.stringify(wishlist));
	}, [wishlist]);

	const addToWishlist = (listingId) => {
		setWishlist((prev) => {
			if (!prev.includes(listingId)) {
				return [...prev, listingId];
			}
			return prev;
		});
	};

	const removeFromWishlist = (listingId) => {
		setWishlist((prev) => prev.filter((id) => id !== listingId));
	};

	return (
		<WishlistContext.Provider
			value={{ wishlist, addToWishlist, removeFromWishlist }}
		>
			{children}
		</WishlistContext.Provider>
	);
};

function useWishlistContext() {
	const context = useContext(WishlistContext);
	if (context === undefined)
		throw new Error(
			"useWishlistContext must be used within a WishlistProvider!"
		);
	return context;
}

export { useWishlistContext, WishlistProvider };
