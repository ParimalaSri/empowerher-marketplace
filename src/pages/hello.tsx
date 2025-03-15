import { useEffect, useState } from "react";

const HelloUser = () => {
    const [username, setUsername] = useState<string | null>(null);



    return <h1>Hello, {username ? username : "Guest"}!</h1>;
};

export default HelloUser;
