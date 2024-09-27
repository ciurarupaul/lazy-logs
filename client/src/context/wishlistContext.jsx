import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import {
	addToWishlist,
	getWishlist,
	removeFromWishlist,
} from "../services/apiUsers";
import { useAuthContext } from "./authContext";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const { authState } = useAuthContext();

	// Fetch the wishlist
	const {
		data: wishlist = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["wishlist"],
		queryFn: getWishlist,
		staleTime: 1000 * 60 * 5,
		enabled: !!authState.user,
	});

	// Add to wishlist mutation
	const { mutate: addToWishlistMutation } = useMutation({
		mutationFn: addToWishlist,
		onSuccess: () => {
			queryClient.invalidateQueries(["wishlist"]);
		},
	});

	// Remove from wishlist mutation
	const { mutate: removeFromWishlistMutation } = useMutation({
		mutationFn: removeFromWishlist,
		onSuccess: () => {
			queryClient.invalidateQueries(["wishlist"]);
		},
	});

	const handleAddToWishlist = (listingId) => {
		if (!authState.user) return;
		addToWishlistMutation(listingId);
	};

	const handleRemoveFromWishlist = (listingId) => {
		if (!authState.user) return;
		removeFromWishlistMutation(listingId);
	};

	return (
		<WishlistContext.Provider
			value={{
				wishlist,
				isLoading,
				error,
				addToWishlist: handleAddToWishlist,
				removeFromWishlist: handleRemoveFromWishlist,
			}}
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
