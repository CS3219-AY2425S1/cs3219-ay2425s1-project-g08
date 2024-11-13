import { get } from 'http';

export async function fetchData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        get(url, (res) => {
            let data = '';

            // Collect response data
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Handle end of response
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error('Error parsing JSON'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}
