import { addDays, format, isAfter } from "date-fns";

export default function findFirstFreeDate(blockedDates) {
	const sortedBlockedDates = blockedDates.sort(
		(a, b) => new Date(a.startDate) - new Date(b.startDate)
	);

	const today = new Date();
	const tomorrow = addDays(today, 1);

	if (
		sortedBlockedDates.length === 0 ||
		isAfter(tomorrow, new Date(sortedBlockedDates[0].startDate))
	) {
		return "tomorrow";
	}

	for (let i = 0; i < sortedBlockedDates.length - 1; i++) {
		const currentEndDate = new Date(sortedBlockedDates[i].endDate);
		const nextStartDate = new Date(sortedBlockedDates[i + 1].startDate);

		if (isAfter(nextStartDate, addDays(currentEndDate, 1))) {
			const firstFreeDay = addDays(currentEndDate, 1);
			if (isAfter(firstFreeDay, tomorrow)) {
				return format(firstFreeDay, "dd.MM");
			} else {
				return "tomorrow";
			}
		}
	}

	const lastEndDate = new Date(
		sortedBlockedDates[sortedBlockedDates.length - 1].endDate
	);
	const firstFreeDayAfterLastBlocked = addDays(lastEndDate, 1);
	if (isAfter(firstFreeDayAfterLastBlocked, tomorrow)) {
		return format(firstFreeDayAfterLastBlocked, "dd.MM");
	} else {
		return "tomorrow";
	}
}
