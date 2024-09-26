export default function formatLabel(value, singular, plural) {
	return value > 1 ? `${value} ${plural}` : `1 ${singular}`;
}
