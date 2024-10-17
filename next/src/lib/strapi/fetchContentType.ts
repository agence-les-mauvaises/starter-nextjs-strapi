/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {string} params - Query parameters to append to the API request.
 * @return {Promise<object>} The fetched data.
 */

interface StrapiData {
  id: number;
  [key: string]: any; // Allow for any additional fields
}

interface StrapiResponse<T extends StrapiData | StrapiData[] = StrapiData | StrapiData[]> {
  data: T;
}

import Strapi from "strapi-sdk-js"

export function spreadStrapiData<T extends StrapiData | StrapiData[]>(data: StrapiResponse<T>): StrapiData | null {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null
}

export default async function fetchContentType<T extends StrapiData, C extends string = string, P extends string = string, S extends boolean = boolean>(
  contentType: C,
  params: P,
  spreadData?: S
): Promise<S extends true ? T | T[] : StrapiResponse<T | T[]>> {
  try {
    // Construct the full URL for the API request
    const url = new URL(`api/${contentType}`, process.env.NEXT_PUBLIC_API_URL);

    // Perform the fetch request with the provided query parameters
    const jsonData =await new Strapi({
      url: process.env.NEXT_PUBLIC_API_URL
    }).find<T | T[]>(contentType, Object.fromEntries(new URLSearchParams(params).entries()))
    return (spreadData ? spreadStrapiData(jsonData) as T | T[]  : jsonData) as S extends true ? T | T[] : StrapiResponse<T | T[]>
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error('FetchContentTypeError', error);
    throw new Error('FetchContentTypeError')
  }
}
