export function cookieParser(cookies){
    return cookies?.split(';').reduce((prev, curr) => {
        const [name, value] = curr.trim().split('=');
        return { ...prev, [name]: value };
    }, {});
}