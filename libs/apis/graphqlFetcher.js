import { API_URL } from '../const';

export default async function graphqlFetcher(query, variables = {}) {
    const res = await fetch(API_URL + '/graphql ', {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    const { data, errors } = await res.json();
    if (errors) {
        console.error(JSON.stringify(errors, 2, null));
        throw new Error(errors?.[0].message);
    }
    return data;
}
