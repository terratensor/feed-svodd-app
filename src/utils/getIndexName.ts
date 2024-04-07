export default function getIndexName(): string {
    return process.env.MANTICORE_INDEX_NAME! != "" ? process.env.MANTICORE_INDEX_NAME! : "feed";
}