const API_URL = process.env.API_URL;

export async function fetchFromAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'credentials': 'include'
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
    }

    return response.json();
}

export async function postToAPI<T>(
    endpoint: string,
    data: unknown,
    options: RequestInit = {}
): Promise<T> {
    return fetchFromAPI<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options,
    });
}

export async function putToAPI<T>(
    endpoint: string,
    data: unknown,
    options: RequestInit = {}
): Promise<T> {
    return fetchFromAPI<T>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options,
    });
}

export async function deleteFromAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    return fetchFromAPI<T>(endpoint, {
        method: 'DELETE',
        ...options,
    });
}
