import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { getListings } from "../../api/apiListings";
import { calculateReviewsAverage } from "../utils/calcAverage";
import { filterListings } from "../utils/filter";
import { sortListings } from "../utils/sort";

const useListings = (filters, sortOption, currentPage, itemsPerPage) => {
	const queryClient = useQueryClient();
	// maintains a cache for all the queries and their associated data. it keeps track of each query's state, including whether it is loading, erroring, or has data available

	const { data, isLoading } = useQuery({
		queryKey: ["listings"],
		queryFn: async () => {
			const response = await getListings();
			return response.data.data;
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			data.forEach((listing) => {
				// cache each individual listings
				queryClient.setQueryData(["listing", listing._id]);
			});
		},
	});

	const listings = data || [];

	const memoizedCalculateReviewsAverage = useMemo(
		() => calculateReviewsAverage,
		[]
	);

	const filteredListings = useMemo(() => {
		let filtered = filterListings(listings, filters);
		let sorted = sortListings(
			filtered,
			sortOption,
			memoizedCalculateReviewsAverage
		);
		return sorted;
	}, [filters, sortOption, listings, memoizedCalculateReviewsAverage]);

	const totalFilteredListings = filteredListings.length;

	const paginatedListings = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredListings.slice(startIndex, endIndex);
	}, [filteredListings, currentPage, itemsPerPage]);

	return {
		filteredListings: paginatedListings,
		isLoading,
		totalFilteredListings,
	};
};

export default useListings;
