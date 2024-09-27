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

// will come back later to fix - fucking hate this, errors make no sense
// for now, wishlist is saved to localstorage

/*import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import {
	addToWishlist,
	getWishlist,
	removeFromWishlist,
} from "../services/apiUsers";
import { useAuthContext } from "./authContext";
import handleError from "../utils/handleError";
import { Loader } from "../ui/utils/Loader";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const { authState } = useAuthContext();

	// Fetch the wishlist only if the user is authenticated
	const {
		data: wishlist = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["wishlist"],
		queryFn: getWishlist,
		enabled: !!authState.user,
		staleTime: 1000 * 60 * 5,
		onError: (err) => handleError(err, "Error fetching your wishlist"),
	});

	// Mutation to add to wishlist
	const addToWishlistMutation = useMutation({
		mutationFn: addToWishlist,
		onSuccess: () => {
			queryClient.invalidateQueries(["wishlist"]);
		},
		onError: (err) => handleError(err, "Error adding to wishlist"),
	});

	// Mutation to remove from wishlist
	const removeFromWishlistMutation = useMutation({
		mutationFn: removeFromWishlist,
		onSuccess: () => {
			queryClient.invalidateQueries(["wishlist"]);
		},
		onError: (err) => handleError(err, "Error removing from wishlist"),
	});

	const handleAddToWishlist = (listingId) => {
		if (!authState.user) return;
		addToWishlistMutation.mutate(listingId);
	};

	const handleRemoveFromWishlist = (listingId) => {
		if (!authState.user) return;
		removeFromWishlistMutation.mutate(listingId);
	};

	return (
		<WishlistContext.Provider
			value={{
				wishlist,
				addToWishlist: handleAddToWishlist,
				removeFromWishlist: handleRemoveFromWishlist,
				isLoading,
				error,
			}}
		>
			{isLoading ? (
				<Loader message="Loading your wishlist..." />
			) : (
				children
			)}
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
*/
