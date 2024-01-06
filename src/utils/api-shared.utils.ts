export const mapToQueryParams = (obj: any): string => {
    if (!obj)
        return "";

    const queryParams = Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join("&");

    return queryParams.length > 0 ? `?${queryParams}` : "";
}