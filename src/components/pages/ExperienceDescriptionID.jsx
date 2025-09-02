
export function _generateStaticParams(metaData) {
    return Object.keys(metaData)
        .filter((key) => metaData[key].hasSection == true)
        .map((key) => ({
            id: key,
        }));
}