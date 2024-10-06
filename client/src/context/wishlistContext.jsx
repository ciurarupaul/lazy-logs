import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import {
	addToWishlist,
	getWishlist,
	removeFromWishlist,
} from "../../api/apiWishlist";
import { useAuthContext } from "./authContext";
import handleError from "../utils/handleError";
import { OnlyLoaderOnPage as Loader } from "../ui/utils/Loader";

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
		enabled: authState?.user !== null && authState?.user?.token !== null,
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
		if (!authState.user || wishlist.includes(listingId)) return;

		// optimistic update
		queryClient.setQueryData(["wishlist"], (oldWishlist) => {
			return [...oldWishlist, listingId];
		});

		addToWishlistMutation.mutate(listingId);
	};

	const handleRemoveFromWishlist = (listingId) => {
		if (!authState.user) return;

		queryClient.setQueryData(["wishlist"], (oldWishlist) => {
			return oldWishlist.filter((id) => id !== listingId);
		});

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
			{isLoading ? <Loader>your wishlist</Loader> : children}
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
