let key = import.meta.env.VITE_CLIENT_SECRET1

export const runCode = async (code, language = "nodejs",fileName = "main.js") => {
    const res = await fetch(`/code-api/v1/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': key
        },
        body: JSON.stringify({
            language: language,
            files: [
                {
                    name: fileName,
                    content: code
                }
            ]
        })
    });

    let result = await res.json();
    console.log(result)
    if (result.status == 'failed') {
        key = import.meta.env.VITE_CLIENT_SECRET2
        const res = await fetch(`/code-api/v1/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': key
            },
            body: JSON.stringify({
                language: language,
                files: [
                    {
                        name: fileName,
                        content: code
                    }
                ]
            })
        });
        result = await res.json();
    }
    console.log(result)

    return result;
};