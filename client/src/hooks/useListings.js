import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuthContext } from "../context/authContext";
import { filterListings } from "../utils/filter";
import { sortListings } from "../utils/sort";
import { calculateReviewsAverage } from "../utils/calcAverage";
import { getListings } from "../services/apiListings";

const useListings = (filters, sortOption, currentPage, itemsPerPage) => {
	const { authState } = useAuthContext();

	const { data, isLoading } = useQuery({
		queryKey: ["listings"],
		queryFn: async () => {
			return getListings();
		},
		enabled: !authState.loading,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	const listings = data?.data?.data || [];

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
